import { FastifyReply, FastifyRequest } from 'fastify';

export const me = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify(); // só valida o token
    return reply.send({ message: 'Token válido' }); // só confirma que está ok
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
};
