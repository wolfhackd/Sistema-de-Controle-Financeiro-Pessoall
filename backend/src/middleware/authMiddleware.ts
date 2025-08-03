import { FastifyRequest, FastifyReply } from 'fastify';

export default async function verifyAccessToken(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
    // Agora você pode acessar o payload decodificado em: request.user
    // Ex: const userId = request.user.userId;
  } catch {
    return reply.status(401).send({ error: 'Token inválido ou expirado' });
  }
}
