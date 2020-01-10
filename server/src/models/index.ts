import { Sequelize } from 'sequelize-typescript';
import { ENV } from '../config/env.config';
import { Dialect } from 'sequelize/types';

export const sequelize = new Sequelize({
    host: ENV.DB_HOST,
    database: ENV.DB_NAME,
    dialect: ENV.DB_DIALECT as Dialect,
    username: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    modelPaths: [__dirname + '/*.model{.js,.ts}'],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')).toLowerCase() === member.toLowerCase();
    },
});

export { Restaurant } from './restaurant';
