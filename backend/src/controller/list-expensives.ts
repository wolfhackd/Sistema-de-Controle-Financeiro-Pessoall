import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';
import { z } from 'zod';
import { Despesa } from '../models/Despesa';

export const listExpensiveSchema = z.object({
  mensal: z.boolean().optional(),
});

type listExpensiveType = z.infer<typeof listExpensiveSchema>;

export const listExpensive = async (
  request: FastifyRequest<{ Body: listExpensiveType }>,
  reply: FastifyReply,
) => {
  try {
    const userId = request.user.userId;
    const { mensal } = request.body;

    const filter: any = { userId };
    if (mensal !== undefined) {
      filter.mensal = mensal;
    }

    const expensives = await Despesa.find(filter).sort({ createdAt: -1 });

    return reply.send({ expensives });
  } catch {
    return reply.status(500).send({ message: 'Erro ao listar despesas' });
  }
};
