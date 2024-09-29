import express from 'express';
import contractRoutes from './routes/contract.routes';
import depositRoutes from './routes/deposit.routes';
import jobRoutes from './routes/job.routes';
import paymentRoutes from './routes/payment.routes';
import profileRoutes from './routes/profile.routes';

const app = express();

app.use(express.json());

// Registrar as rotas
app.use('/contracts', contractRoutes);
app.use('/deposits', depositRoutes);
app.use('/jobs', jobRoutes); // A rota de jobs deve ser aqui
app.use('/payments', paymentRoutes);
app.use('/profiles', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

