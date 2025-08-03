import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { CreateAccount, CreateAccountSchema } from '../controller/create-account';
import { LoginAccount, LoginAccountSchema } from '../controller/login-account';
import AuthMiddleware from '../middleware/authMiddleware';
import { Logout } from '../controller/logout-account';

export const AccountRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/createAccount', { schema: { body: CreateAccountSchema } }, CreateAccount);
  app.post('/login', { schema: { body: LoginAccountSchema } }, LoginAccount);

  // app.addHook('preHandler', AuthMiddleware);
  // app.post('/logout', Logout);
  app.register((privateRoutes, _, done) => {
    privateRoutes.addHook('preHandler', AuthMiddleware);

    privateRoutes.post('/logout', Logout);

    done();
  });
};
