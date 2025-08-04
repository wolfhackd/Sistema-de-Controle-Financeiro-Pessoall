import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { ExpensiveSchema, createExpensive } from '../controller/create-expensive';
import AuthMiddleware from '../middleware/authMiddleware';

export const DashboardRoutes: FastifyPluginCallbackZod = (app) => {
  // app.addHook('preHandler', AuthMiddleware);
  app.register((privateRoutes, _, done) => {
    privateRoutes.addHook('preHandler', AuthMiddleware);
    privateRoutes.post('/createExpensive', { schema: { body: ExpensiveSchema } }, createExpensive);

    done();
  });
};
