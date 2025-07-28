import fastifyCors from '@fastify/cors';
import Fastify from 'fastify';
import { env } from './src/env.ts';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import mongoose from 'mongoose';
import { CreateAccountRoute } from './src/routes/account-routes.ts';
import fastifyCookie from '@fastify/cookie';

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
  // secret: env.JWT_REFRESH_SECRET,
  parseOptions: {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: false, // true em produção
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

app.register(CreateAccountRoute);

//Init do server
app.listen(
  {
    port: env?.PORT,
  },
  () => {
    console.log('Funcionando');
  },
);
