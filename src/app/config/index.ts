import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  ACCESS_EXPIRE_IN: process.env.ACCESS_EXPIRE_IN,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  REFRESH_EXPIRE_IN: process.env.REFRESH_EXPIRE_IN,
};
