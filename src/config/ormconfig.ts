import { ConnectionOptions } from 'typeorm';
import Device from '../entities/Device';
import DeviceAlarm from '../entities/DeviceAlarm';
import DeviceBattery from '../entities/DeviceBattery';
import DeviceHealth from '../entities/DeviceHealth';
import DeviceLocation from '../entities/DeviceLocation';
import DeviceTemperature from '../entities/DeviceTemp';
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
    username: 'root',
    password: '54646673@More',
    database: 'jica',
};

const live = {
    host: '185.224.138.91',
    port: 3306,
    username: 'u475704749_jica_root',
    password: '0tNTNjaP>O@',
    database: 'u475704749_JICA',
};

const deploy = {
    url: process.env.DATABASE_URL,
    extra: { ssl: true },
};

const config = process.env.DATABASE_URL ? deploy : live;

export const dbconfig: ConnectionOptions = {
    ...config,
    type: 'mysql',
    synchronize: true,
    logging: false,
    entities: [
        User,
        DeviceLocation,
        DeviceAlarm,
        DeviceHealth,
        DeviceBattery,
        DeviceTemperature,
        Device,
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