import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';
import { z } from 'zod';
import { Despesa } from '../models/Despesa';

const date = new Date();
const day = date.getDate();

export const ExpensiveSchema = z.object({
  nome: z.string().nonempty('Não pode estar vazio'),
  status: z.number().default(1),
  mensal: z.boolean().default(false),
  vencimento: z.number().default(day),
  categoria: z.string().nonempty(),
  valor: z.number().default(0.0),
});

type ExpensiveType = z.infer<typeof ExpensiveSchema>;

export const createExpensive = async (
  request: FastifyRequest<{ Body: ExpensiveType }>,
  reply: FastifyReply,
) => {
  try {
    const { nome, status, mensal, vencimento, categoria, valor } = request.body;
    const userId = request.user.userId;
    if (!userId) {
      throw new Error('Houve um erro de sessão');
    }
    const novaDespesa = await Despesa.create({
      userId,
      nome,
      status,
      mensal,
      vencimento,
      categoria,
      valor,
    });

    reply.status(201).send({ message: 'Despesa criada com sucesso.' });
  } catch (err) {
    reply.status(400).send({ message: 'Houve um erro' + err });
  }
};
