import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';
import { z } from 'zod';
//  {
//     nome: 'Água',
//     status: 1,
//     mensal: false,
//     vencimento: 5,
//     categoria: 'Outros',
//     valor: 250,
//   },
const date = new Date();
const day = date.getDate();

export const ExpensiveSchema = z.object({
  nome: z.string().nonempty('Não pode estar vazio'),
  // status: z.number().default(1),
  // mensal: z.boolean().default(false),
  // vencimento: z.number().default(day),
  // categoria: z.string().nonempty(),
  // valor: z.number().default(0.0),
  // userId: z.string().nonempty(),
});

type ExpensiveType = z.infer<typeof ExpensiveSchema>;

export const createExpensive = async (
  request: FastifyRequest<{ Body: ExpensiveType }>,
  reply: FastifyReply,
) => {
  try {
    // const { nome, status, mensal, vencimento, categoria, valor } = request.body;
    const { nome } = request.body;
    const userId = request.user.userId;
    if (!userId) {
      reply.status(201).send({ nome });
    }
    reply.status(201).send({ id: userId, nome });
  } catch {
    reply.status(400).send({ message: 'Lascou padin' });
  }
};
