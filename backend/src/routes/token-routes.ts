import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import AuthMiddleware from '../middleware/authMiddleware';
import { me } from '../controller/me';

export const meRoutes: FastifyPluginCallbackZod = (app) => {
  app.addHook('preHandler', AuthMiddleware);
  app.get('/me', me);
};
