import { ConnectionOptions } from 'typeorm';
import DeviceLocation from '../entities/DeviceLocation';
import User from '../entities/User'

const docker = {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'plug',
};

const dev = {
    host: 'localhost',
    port: 3306,
    username: 'jica',
    password: '54646673@More',
    database: 'jica',
};

const deploy = {
    url: process.env.DATABASE_URL,
    extra: { ssl: true },
};

const config = process.env.DATABASE_URL ? deploy : dev;

export const dbconfig: ConnectionOptions = {
    ...config,
    type: 'mysql',
    synchronize: true,
    logging: false,
    entities: [
        User,
        DeviceLocation,
    ],
    dropSchema: false,
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: '../entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
};