import { Response } from 'express';

export const handleErrorResponse = (res: Response, error: unknown): void => {
  if (error instanceof Error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
    throw error;
  } else {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    throw new Error('Unexpected error occurred');
  }
};