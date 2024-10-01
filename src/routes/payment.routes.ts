import { Router } from 'express';
import { createPayment, getPaymentsByJobId, getAllPayments, getTotalPaidByJobId, calculateTotalToPay } from '../controllers/payment.controller'; 

const router = Router();

// Defina as rotas
router.post('/:jobId', createPayment); // Criar pagamento
router.get('/:jobId', getPaymentsByJobId); // Obter pagamentos de um Job específico
router.get('/', getAllPayments); // Obter todos os pagamentos
router.get('/:jobId/total', getTotalPaidByJobId); // Obter total pago por Job
router.get('/:jobId/calculate-total', calculateTotalToPay); // Calcular total a pagar

export default router;