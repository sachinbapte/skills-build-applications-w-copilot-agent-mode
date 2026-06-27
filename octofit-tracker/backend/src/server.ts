import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import apiRouter from './routes/api';
import healthRouter from './routes/health';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());
app.use('/api', healthRouter);
app.use('/api', apiRouter);

const startServer = async (): Promise<void> => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`Base URL: ${baseUrl}`);
  });
};

startServer().catch((error) => {
  console.error('Server startup error:', error);
  process.exit(1);
});
