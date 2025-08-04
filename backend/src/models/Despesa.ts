import mongoose, { Schema } from 'mongoose';

const DespesaSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  },
  nome: { type: String, required: true },
  status: { type: Number, default: 1 },
  mensal: { type: Boolean, default: false },
  vencimento: { type: Number, required: true },
  categoria: { type: String, default: 'Outros' },
  valor: { type: Number, default: 0.0 },
});

export const Despesa = mongoose.model('despesas', DespesaSchema);
