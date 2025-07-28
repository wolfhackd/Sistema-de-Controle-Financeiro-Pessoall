import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { CreateAccount, CreateAccountSchema } from '../controller/create-account';
import { LoginAccount, LoginAccountSchema } from '../controller/login-account';

export const CreateAccountRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/createAccount', { schema: { body: CreateAccountSchema } }, CreateAccount);

  app.post('/login', { schema: { body: LoginAccountSchema } }, LoginAccount);
};
