import supertest from 'supertest';

import { app } from './app';

describe('Express app', () => {
  describe('Routing', () => {
    it('should return `Hello world` when GET index', async () => {
      const response = await supertest(app).get('/');

      expect(response.statusCode).toEqual(200);
      expect(response.body.msg).toEqual(
        'please POST your superhero score to /score, in the format: {“superheroScore”: 42.5 // Float between 0 and 100}',
      );
    });

    it('should return `NOT FOUND` when GET a not found route', async () => {
      const response = await supertest(app).get('/random-page');

      expect(response.statusCode).toEqual(404);
      expect(response.body.error).toEqual('NOT FOUND');
    });
  });
});
