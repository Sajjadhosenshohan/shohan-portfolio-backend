import express, { Application, Request, Response } from 'express';
import notFound from './app/middlewares/notFound';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import { globalErrorHandler } from './app/error/globalErrorHandler';
const app: Application = express();

const corseOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
  ],
  credentials: true,
};

app.use(cors(corseOptions));

// Serve static files from public/uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));


// parder
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    database: process.env.DATABASE_URL ? `LOADED SUCCESSFULLY ${process.env.DATABASE_URL}` : "NOT LOADED (UNDEFINED)",
    message: 'Shohan portfolio server is running..!',
  });
});


// for global error
app.use(globalErrorHandler);

// for not found route
app.use(notFound);

export default app;
