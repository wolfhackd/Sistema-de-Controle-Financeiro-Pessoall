import { FastifyReply, FastifyRequest } from 'fastify';

export const me = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
    return reply.status(200).send({ ok: true });
  } catch {
    return reply.status(401).send({ error: 'Não autorizado' });
  }
};
