import { Router } from 'express';
import {
  createPayment,
  getPaymentsByJobId,
  getAllPayments,
  getTotalPaidByJobId
} from '../controllers/payment.controller'; 

const router = Router();

// Rota para criar um pagamento
router.post('/:jobId', createPayment);

// Rota para obter todos os pagamentos de um job específico
router.get('/:jobId', getPaymentsByJobId);

// Rota para obter o total pago de um job específico
router.get('/:jobId/total', getTotalPaidByJobId); // Nova rota para total pago

// Rota para obter todos os pagamentos
router.get('/', getAllPayments); 

export default router;