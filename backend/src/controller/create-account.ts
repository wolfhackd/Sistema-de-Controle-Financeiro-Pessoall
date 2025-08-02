import { z } from 'zod';
import { Usuario } from '../models/Usuario';
import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';

export const CreateAccountSchema = z.object({
  email: z.email('Digite o email').nonempty('Este campo não pode ser vazio'),
  nome: z.string('Digite seu nome').nonempty('Este campo não pode ser vazio'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type CreateAccountType = z.infer<typeof CreateAccountSchema>;

export const CreateAccount = async (
  request: FastifyRequest<{ Body: CreateAccountType }>,
  reply: FastifyReply,
) => {
  try {
    const { email, nome, senha, confirmarSenha } = request.body;
    if (senha !== confirmarSenha) {
      return reply.status(400).send({ error: 'As senhas não coincidem' });
    }
    const UsuarioExiste = await Usuario.findOne({ email });
    if (!UsuarioExiste) {
      const senhaHash = await bcrypt.hash(senha, 10);
      const novoUsuario = await Usuario.create({
        email,
        nome,
        senha: senhaHash,
      });
      return reply.status(201).send({ message: `Usuário criado com sucesso ${novoUsuario}` });
    }
    throw new Error('Um usuário com esse email já existe');
  } catch (error: any) {
    return reply
      .status(500)
      .send({ error: 'Não foi possível criar o usuário', detalhes: error.message });
  }
};
