import jwt from 'jsonwebtoken';
import { env } from '../env';
import { FastifyRequest } from 'fastify/types/request';
import { FastifyReply } from 'fastify/types/reply';

export async function refreshTokenHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      return reply.status(401).send({ message: 'Refresh token ausente' });
    }

    const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { userId: string };

    const newAccessToken = await reply.jwtSign({ userId: payload.userId }, { expiresIn: '15m' });

    reply.setCookie('accessToken', newAccessToken, { httpOnly: true, path: '/', maxAge: 60 * 15 });
    return reply.send({ message: 'Access token renovado' });
  } catch (err) {
    return reply.status(401).send({ message: 'Refresh token inválido ou expirado' });
  }
}
