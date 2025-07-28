import { z } from 'zod';
import { Usuario } from '../models/Usuario';
import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import { generateToken } from './token';
import '@fastify/cookie';

export const LoginAccountSchema = z.object({
  email: z.email('Digite o email').nonempty('Este campo não pode ser vazio'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginAccountType = z.infer<typeof LoginAccountSchema>;

export const LoginAccount = async (
  request: FastifyRequest<{ Body: LoginAccountType }>,
  reply: FastifyReply,
) => {
  try {
    const { email, senha } = request.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return reply.status(404).send({ error: 'Usuário não encontrado' });
    }

    //Comparação de senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return reply.status(401).send({ error: 'Senha incorreta' });
    }

    //Criação de Token
    const { accessToken, refreshToken } = generateToken(usuario);

    usuario.refreshToken = refreshToken;
    await usuario.save();

    return reply
      .setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 dias
      })
      .setCookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        path: '/',
        maxAge: 60 * 15, // 15 min
      })
      .status(200)
      .send({ message: 'Login realizado com sucesso' });

    // return reply.status(200).send({
    //   message: 'Login realizado com sucesso',
    //   accessToken,
    //   refreshToken,
    //   usuario: { email: usuario.email, nome: usuario.nome },
    // });
  } catch (error: any) {
    return reply
      .status(500)
      .send({ error: 'Não foi possível logar o usuário', detalhes: error.message });
  }
};
