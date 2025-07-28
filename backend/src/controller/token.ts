import jwt from 'jsonwebtoken';
import { env } from '../env.ts';

export const generateToken = (usuario: any) => {
  const accessToken = jwt.sign({ userId: usuario._id, email: usuario.email }, env.JWT_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(
    { userId: usuario._id, email: usuario.email },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: '7d',
    },
  );

  return { accessToken, refreshToken };
};
