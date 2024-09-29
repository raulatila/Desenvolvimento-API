// deposit.routes.ts
import { Router } from 'express';
import { createDeposit, findAllDeposits, findDepositById, updateDeposit } from '../controllers/deposit.controller';

const router = Router();

// Rota para criar um depósito
router.post('/', createDeposit);

// Rota para obter todos os depósitos
router.get('/', findAllDeposits);

// Rota para obter um depósito pelo ID
router.get('/:id', findDepositById);

// Rota para atualizar um depósito pelo ID
router.put('/:id', updateDeposit);

export default router;

