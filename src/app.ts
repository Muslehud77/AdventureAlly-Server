import express, { Request, Response } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { notFound } from './App/ErrorHandler/notFound';
import { globalErrorHandler } from './App/ErrorHandler/globalErrorHandler';
import router from './App/routes';
const app = express();


// parsers
app.use(cookieParser());
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

// application routes
app.use('/api',router)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!');
});


//global err handler
app.use(globalErrorHandler)

//Not found route
app.use(notFound)

export default app