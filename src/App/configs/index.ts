import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT
const dbUri  = process.env.DB_URI as string
const saltRounds = Number(process.env.HASH_SALT) as number;
const defaultPassword = process.env.DEFAULT_PASS as string;
const node_env = process.env.NODE_ENV as string;
const jwt_access_secret = process.env.JWT_ACCESS_SECRET as string;
const jwt_refresh_secret = process.env.JWT_REFRESH_SECRET as string;
const jwt_access_expiresIn = process.env.JWT_ACCESS_EXPIRES_IN as string;
const jwt_refresh_expiresIn = process.env.JWT_REFRESH_EXPIRES_IN as string; 

export default {
  dbUri,
  port,
  saltRounds,
  defaultPassword,
  node_env,
  jwt_access_secret,
  jwt_refresh_secret,
  jwt_access_expiresIn,
  jwt_refresh_expiresIn,
};
