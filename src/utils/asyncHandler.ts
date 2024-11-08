import { Request, Response, NextFunction } from 'express';

/**
 * Wraps async route handlers to catch and forward errors to Express error handler.
 * @param fn - Async route handler function.
 * @returns - A function with error handling that Express can recognize as middleware.
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
