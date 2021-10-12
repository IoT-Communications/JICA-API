import { ApolloServer, PubSub } from 'apollo-server-express';
import { decode } from 'jsonwebtoken';
import { createConnection } from 'typeorm';
import { dbconfig } from '../config/ormconfig';
import User from '../entities/User';
import schema from './../schema';
import { createServer } from "http";


const FCM = require('fcm-node');
const { Storage } = require('@google-cloud/storage')
const path = require('path')
const express = require('express');


const severKeyPath = '../config/plug-ed9ac-firebase-adminsdk-x48j5-7e40fd8a4b.json'
const serverKey = require(severKeyPath)

const gc = new Storage({
  keyFilename: path.join(__dirname,severKeyPath),
  projectId: "plug-ce5c7"
})

const plugBucket = gc.bucket("plug_bucket");

export const fcm = new FCM(serverKey)

export const pubSub = new PubSub()

export async function startServer(port: number) {

  const apolloServer = new ApolloServer({
    schema,
    uploads: {
      maxFiles: 10,
      maxFileSize: 9000000000,
      maxFieldSize: 9000000000
    },
    subscriptions: {
      keepAlive: 2400000, // 24 hours
    },
    context: async ({ req }) => {
      const token = req?.headers?.authorization || '';
      const user = await getUser(token);
      
      if (user != null) {
        return { user, fcm, pubSub, plugBucket };
      }
      return { fcm, pubSub, plugBucket };
    },

  });
  await connectDB();
  await apolloServer.start();

  const app = express();
  apolloServer.applyMiddleware({ 
      app,
      path: '/',
      bodyParserConfig: { limit: "50gb" },
  });

  const httpServer = createServer(app);

  apolloServer.installSubscriptionHandlers(httpServer)

  await new Promise(resolve => httpServer.listen({ port: process.env.PORT || port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || port}${apolloServer.graphqlPath}`);
 
}

const getUser = async (token: string) => {
  const [Bearer, jwt] = token.split(' ');
  const userId = decode(jwt);
  if (!Bearer || !userId) return null;
  //@ts-ignore
  const user = await User.findOne(userId.id);
  return user;
};

const connectDB = async () => {
  let retry = 10;
  while (retry !== 0) {
    try {
      await createConnection(dbconfig);
      console.log('🗄️ database connected 🗄️');
      break;
    } catch (e) {
      retry--;
      console.log(e);
      console.log(`${retry} retries remaining`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};
