/// <reference path="./src/types/fastify-jwt.d.ts" />
import fastifyCors from '@fastify/cors';
import Fastify from 'fastify';
import { env } from './src/env.ts';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import mongoose from 'mongoose';
import { AccountRoute } from './src/routes/account-routes.ts';
import { DashboardRoutes } from './src/routes/dashboard-routes.ts';
import { meRoutes } from './src/routes/token-routes.ts';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';

const app = Fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

//Cors
app.register(fastifyCors, {
  origin: env?.ORIGIN,
  credentials: true,
});

//Cookies
app.register(fastifyCookie, {
  parseOptions: {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: false, // true em produção
  },
});

//JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'accessToken',
    signed: false,
  },
});

//Mogoose
mongoose.Promise = global.Promise;

mongoose
  .connect(env?.CONNECTION_STRING_DB!)
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((err) => console.log('Erro ao conectar: ' + err));

app.get('/health', () => 'OK');

//Essa área será para registro de rotas

app.register(AccountRoute);
app.register(DashboardRoutes);
app.register(meRoutes);

//Init do server
app.listen(
  {
    port: env?.PORT,
  },
  () => {
    console.log('Funcionando');
  },
);
