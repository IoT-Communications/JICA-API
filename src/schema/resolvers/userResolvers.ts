import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { contextType } from '..';
import { returnError } from '../../config/errorHandling';
import { getCustomRepository } from 'typeorm'
import {
  DUPLICATE_USER,
  INVALID_PASSWORD,
  NO_USER,
  UN_AUTHROIZED,
} from '../../config/errorMessages';
import User from '../../entities/User';


const resolvers = {
  Query: {
    me,
    login,
  },
  Mutation: {
    register,
    
  },
};

//Query
/* ---------------------ME-------------------------- */
async function me(_: any, { }: any, { user }: contextType) {
  if (!user) return returnError('getUsers', UN_AUTHROIZED);
  return user;
}



/* ---------------------GET_USERS-------------------------- */

async function getUsers(_: any, { }: any, { user }: contextType) {
  if (!user) return returnError('getUsers', UN_AUTHROIZED);
  let users = await User.find({
  });
  users = users.filter(us => us.id !== user.id);
  return { users };
}

//Mutation
/* --------------------REGISTER-------------------------- */

async function register(_: any, { email, username, password, fcmToken }: any) {
  // const userName = await User.findOne({ name });
  // if (userName) return returnError('name', DUPLICATE_USER('name'));
  let userExist
  if(email.includes('@')){
    userExist = await User.findOne({ email: email });
    if (userExist) return returnError('email', DUPLICATE_USER('email'));
  }

  const hashedPassword = await hash(password, 10);
  let user  = await User.create({
    email: email,
    password: hashedPassword,
    username,
    fcmToken,
  }).save();

  const token = sign({ id: user.id }, process.env.JWT_SECRET_TOKEN);
  return { 
    token: token,
  };
  
}

/* ------------------------LOGIN------------------------------- */
async function login(_: any, { email, password, fcmToken }: any) {

  console.log('logging in...')
  const userExist = await User.findOne({
    where: {
      email: email,
    }
    
  });
  if (!userExist) return returnError('email', NO_USER);

  const validPassword = await compare(password, userExist.password);
  if (!validPassword) return returnError('password', INVALID_PASSWORD);

  const token = sign({ id: userExist.id }, process.env.JWT_SECRET_TOKEN);

  if (fcmToken != userExist.fcmToken && fcmToken != null) {
    userExist.fcmToken = fcmToken;
    await userExist.save();
  }
  return { 
            token
          };
}

/* -----------------------DELELTE_USER------------------------- */
async function deleteUser(_: any, { }: any, { user }: contextType) {
  await user.remove();
}


export default resolvers;