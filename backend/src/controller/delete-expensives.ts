import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';
import { z } from 'zod';
import { Despesa } from '../models/Despesa';

const date = new Date();
const day = date.getDate();

export const DeleteSchema = z.object({
  _id: z.string(),
});

type DeleteType = z.infer<typeof DeleteSchema>;

export const deleteExpensive = async (
  request: FastifyRequest<{ Body: DeleteType }>,
  reply: FastifyReply,
) => {
  try {
    const { _id } = request.body;
    const userId = request.user.userId;
    if (!userId) {
      throw new Error('Houve um erro de sessão');
    }
    const deletarDespesa = await Despesa.deleteOne({
      userId,
      _id,
    });

    reply.status(201).send({ message: 'Despesa apagada com sucesso.' });
  } catch (err) {
    reply.status(400).send({ message: 'Houve um erro' + err });
  }
};
