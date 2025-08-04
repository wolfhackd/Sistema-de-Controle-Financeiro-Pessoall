import mongoose, { Schema } from 'mongoose';

const CategoriaSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  },
  nome: { type: String, required: true },
});

export const Categoria = mongoose.model('categorias', CategoriaSchema);
