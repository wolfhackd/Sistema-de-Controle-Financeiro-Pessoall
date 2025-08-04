import jwt from 'jsonwebtoken';
import { env } from '../env.ts';

export const generateToken = (usuario: any) => {
  const accessToken = jwt.sign({ userId: usuario._id, email: usuario.email }, env.ACCESS_TOKEN, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ userId: usuario._id, email: usuario.email }, env.REFRESH_TOKEN, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};
