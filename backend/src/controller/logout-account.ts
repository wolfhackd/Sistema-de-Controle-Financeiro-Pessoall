import { FastifyReply, FastifyRequest } from 'fastify';

export const Logout = async (request: FastifyRequest, reply: FastifyReply) => {
  reply
    .clearCookie('accessToken', { path: '/' })
    .clearCookie('refreshToken', { path: '/' })
    .status(200)
    .send({ message: 'Logout realizado com sucesso' });
};
