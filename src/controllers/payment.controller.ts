import { Request, Response } from 'express';
import Payment from '../models/payment.model';
import Job from '../models/job.model';
import axios from 'axios';

// Definindo a interface para a resposta esperada
interface UnpaidResponse {
  totalUnpaid: number;
}

interface PaidResponse {
  totalPaid: number;
}

// Função para criar um pagamento
export const createPayment = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const { paymentValue, operationDate } = req.body;

  try {
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job não encontrado.' });
    }

    const newPayment = await Payment.create({
      jobId: parseInt(jobId, 10),
      paymentValue,
      operationDate: new Date(operationDate),
    });

    return res.status(201).json(newPayment);
  } catch (error: unknown) {
    console.error("Erro ao criar o pagamento:", error);
    return res.status(500).json({ message: 'Erro ao criar o pagamento.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};

// Função para obter todos os pagamentos de um Job específico
export const getPaymentsByJobId = async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const payments = await Payment.findAll({ where: { jobId: parseInt(jobId, 10) } });
    return res.status(200).json(payments);
  } catch (error: unknown) {
    console.error("Erro ao buscar pagamentos:", error);
    return res.status(500).json({ message: 'Erro ao buscar pagamentos.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};

// Função para obter todos os pagamentos
export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll();
    return res.status(200).json(payments);
  } catch (error: unknown) {
    console.error("Erro ao obter pagamentos:", error);
    return res.status(500).json({ message: 'Erro ao obter pagamentos.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};

// Função para calcular o total pago de um Job específico
export const getTotalPaidByJobId = async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const payments = await Payment.findAll({ where: { jobId: parseInt(jobId, 10) } });
    const totalPaid = payments.reduce((sum, payment) => sum + payment.paymentValue, 0);
    
    return res.status(200).json({ totalPaid });
  } catch (error: unknown) {
    console.error("Erro ao calcular o total pago:", error);
    return res.status(500).json({ message: 'Erro ao calcular o total pago.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};

// Nova função para calcular o total a pagar
export const calculateTotalToPay = async (req: Request, res: Response): Promise<Response> => {
  const { jobId } = req.params;

  try {
    // Obter total não pago
    const unpaidResponse = await axios.get<UnpaidResponse>('http://localhost:3000/jobs/unpaid/sum');
    const totalUnpaid = unpaidResponse.data.totalUnpaid || 0;

    // Obter total pago
    const paidResponse = await axios.get<PaidResponse>(`http://localhost:3000/payments/${jobId}/total`);
    const totalPaid = paidResponse.data.totalPaid || 0;

    // Calcular total a pagar
    const totalToPay = totalUnpaid - totalPaid;

    return res.status(200).json({ totalToPay });
  } catch (error: unknown) {
    console.error("Erro ao calcular total a pagar:", error);
    return res.status(500).json({ message: 'Erro ao calcular total a pagar', error: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};