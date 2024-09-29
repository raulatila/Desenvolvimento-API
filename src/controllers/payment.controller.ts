import { Request, Response } from 'express';
import Payment from '../models/payment.model';
import Job from '../models/job.model';

// Função para criar um pagamento
export const createPayment = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const { paymentValue, operationDate } = req.body;

  try {
    // Verificar se o Job existe
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job não encontrado.' });
    }

    // Criar o pagamento
    const newPayment = await Payment.create({
      jobId: parseInt(jobId, 10),
      paymentValue,
      operationDate: new Date(operationDate),
    });

    return res.status(201).json(newPayment);
  } catch (error: any) {
    console.error("Erro ao criar o pagamento:", error);
    return res.status(500).json({ message: 'Erro ao criar o pagamento.', error: error.message });
  }
};

// Função para obter todos os pagamentos de um Job específico
export const getPaymentsByJobId = async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const payments = await Payment.findAll({ where: { jobId: parseInt(jobId, 10) } });
    return res.status(200).json(payments);
  } catch (error: any) {
    console.error("Erro ao buscar pagamentos:", error);
    return res.status(500).json({ message: 'Erro ao buscar pagamentos.', error: error.message });
  }
};

// Função para obter todos os pagamentos
export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll();
    return res.status(200).json(payments);
  } catch (error: any) {
    console.error("Erro ao obter pagamentos:", error);
    return res.status(500).json({ message: 'Erro ao obter pagamentos.', error: error.message });
  }
};
