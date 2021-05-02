import dotenv from 'dotenv';
import pg from 'pg';
import { PrismaClient } from '@prisma/client';

const PRISMA = new PrismaClient();
const Pool = pg.Pool;
dotenv.config();

//$ Server dotenvs
const SERVER_PORT = process.env.SERVER_PORT || 8080;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

//$ Server Token dotenvs
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'CawfeeHouse';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'Loremipsum';

//$ Database dotenvs
const DATABASE_USER = process.env.DATABASE_USER || 'postgres';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'password';
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = parseInt(process.env.DATABASE_PORT!) || 5432;
const DATABASE_NAME = process.env.DATABASE_NAME || 'test';

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
	token: {
		expireTime: SERVER_TOKEN_EXPIRETIME,
		issuer: SERVER_TOKEN_ISSUER,
		secret: SERVER_TOKEN_SECRET,
	},
};

const DATABASE = new Pool({
	user: DATABASE_USER,
	password: DATABASE_PASSWORD,
	host: DATABASE_HOST,
	port: DATABASE_PORT,
	database: DATABASE_NAME,
});

const config = {
	server: SERVER,
	database: DATABASE,
	prisma: PRISMA,
};

export default config;
