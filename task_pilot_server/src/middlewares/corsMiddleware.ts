import cors from 'cors';

const corsOptions = {
  origin: ['https://example.com', 'https://anotherdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);
