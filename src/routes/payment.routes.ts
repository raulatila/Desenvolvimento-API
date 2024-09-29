import { Router } from 'express';
import { createPayment, getPaymentsByJobId, getAllPayments } from '../controllers/payment.controller'; 

const router = Router();

// Rota para criar um pagamento
router.post('/:jobId/payments', createPayment);

// Rota para obter todos os pagamentos de um job específico
router.get('/:jobId/payments', getPaymentsByJobId);

// Rota para obter todos os pagamentos
router.get('/', getAllPayments);

export default router;
