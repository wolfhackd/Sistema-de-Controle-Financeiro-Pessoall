import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { ExpensiveSchema, createExpensive } from '../controller/create-expensive';
import AuthMiddleware from '../middleware/authMiddleware';
import { listExpensive, listExpensiveSchema } from '../controller/list-expensives';
import { deleteExpensive, DeleteSchema } from '../controller/delete-expensives';

export const DashboardRoutes: FastifyPluginCallbackZod = (app) => {
  app.addHook('preHandler', AuthMiddleware);
  app.post('/createExpensive', { schema: { body: ExpensiveSchema } }, createExpensive);
  app.post('/listExpensive', { schema: { body: listExpensiveSchema } }, listExpensive);
  app.post('/deleteExpensive', { schema: { body: DeleteSchema } }, deleteExpensive);
};
