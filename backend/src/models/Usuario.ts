import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  refreshToken: { type: String, default: null },
});

export const Usuario = mongoose.model('usuarios', UsuarioSchema);
