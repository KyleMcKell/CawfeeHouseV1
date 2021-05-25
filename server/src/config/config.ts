import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const PRISMA = new PrismaClient();
dotenv.config();

//$ Server dotenvs
const SERVER_PORT = process.env.PORT || 8080;
const SERVER_HOSTNAME = process.env.HOSTNAME || 'localhost';
const SERVER_ORIGIN = process.env.ORIGIN || 'http://localhost:3000';

//$ Server Token dotenvs
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600; //$ 1 Hour of time in seconds
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'CawfeeHouse';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'Loremipsum';

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
	origin: SERVER_ORIGIN,
	token: {
		expireTime: SERVER_TOKEN_EXPIRETIME,
		issuer: SERVER_TOKEN_ISSUER,
		access: ACCESS_TOKEN_SECRET,
	},
};

const config = {
	server: SERVER,
	prisma: PRISMA,
};

export default config;
