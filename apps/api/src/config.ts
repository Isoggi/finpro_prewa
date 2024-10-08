import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file
export const BASE_URL = process.env.BASE_URL || 'http://localhost';
export const WEB_URL = process.env.WEB_URL || 'http://localhost:3000';
export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';

export const GENERAL_JWT_SECRET = process.env.GENERAL_JWT_SECRET || 'secret';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRY = process.env.JWT_EXPIRY || 3600;

export const VERIFICATION_URL_PATH = process.env.VERIFICATION_URL_PATH || '';
export const VERIFICATION_JWT_SECRET =
  process.env.VERIFICATION_JWT_SECRET || '';
export const FORGETPASSWORD_URL_PATH =
  process.env.FORGETPASSWORD_URL_PATH || '';
export const FORGETPASSWORD_JWT_SECRET =
  process.env.FORGETPASSWORD_JWT_SECRET || '';

export const NODEMAILER_EMAIL =
  process.env.NODEMAILER_EMAIL || 'jcwd2902@gmail.com';
export const NODEMAILER_PASSWORD =
  process.env.NODEMAILER_PASSWORD || 'dsefbavzyajmaqkr';
