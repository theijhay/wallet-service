import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import walletRoutes from './routes/walletRoutes';

const app = express();
app.use(express.json());

// Route declarations
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/wallets', walletRoutes);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
