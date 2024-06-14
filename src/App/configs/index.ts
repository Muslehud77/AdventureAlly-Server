import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT
const dbUri  = process.env.DB_URI as string



export default { port, dbUri };
