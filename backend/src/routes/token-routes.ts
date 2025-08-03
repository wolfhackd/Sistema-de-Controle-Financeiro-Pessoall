import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import AuthMiddleware from '../middleware/authMiddleware';
import { me } from '../controller/me';
import { refreshTokenHandler } from '../controller/refresh-token';

export const meRoutes: FastifyPluginCallbackZod = (app) => {
  app.post('/refresh', refreshTokenHandler);
  app.addHook('preHandler', AuthMiddleware);
  app.get('/me', me);
};
