import 'express-async-errors';

import express, { json } from 'express';
import helmet from 'helmet';

import { scoreController } from './controllers/superhero';

const app = express();
app.use(json());
app.use(helmet());

app.get('/', (_req, res, _next) => {
  res.json({
    msg: 'please POST your superhero score to /score, in the format: {“superheroScore”: 42.5 // Float between 0 and 100}',
  });
});

app.post('/score', scoreController);

app.use((_, res, _2) => {
  res.status(404).json({ error: 'NOT FOUND' });
});

export { app };
