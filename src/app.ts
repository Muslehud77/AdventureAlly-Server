import express, { Request, Response } from 'express';
import cors from 'cors'
import { notFound } from './App/ErrorHandler/notFound';
import { globalErrorHandler } from './App/ErrorHandler/globalErrorHandler';
import router from './App/routes';
const app = express();


// parsers
app.use(express.json())
app.use(cors())

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