    import { Router } from 'express';
    import { createContract, getContractById, getAllContracts } from '../controllers/contract.controller';

    const router = Router();

    // Rota para criar um novo contrato
    router.post('/create', createContract);

    // Rota para obter um contrato pelo ID
    router.get('/:contractId', getContractById);

    // Rota para listar todos os contratos
    router.get('/', getAllContracts);

    export default router;
