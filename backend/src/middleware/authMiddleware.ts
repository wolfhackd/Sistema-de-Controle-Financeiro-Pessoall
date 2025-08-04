import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { env } from '../env';

export default async function AuthMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      return reply.status(401).send({ message: 'Não autenticado' });
    }

    try {
      const payload = jwt.verify(refreshToken, env.REFRESH_TOKEN) as { userId: string };

      const newAccessToken = await reply.jwtSign({ userId: payload.userId }, { expiresIn: '15m' });

      reply.setCookie('accessToken', newAccessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 15,
      });

      request.user = { userId: payload.userId };
    } catch {
      return reply.status(401).send({ message: 'Refresh token inválido ou expirado' });
    }
  }
}
