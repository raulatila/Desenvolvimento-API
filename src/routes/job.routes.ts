import { Router } from 'express';
import { getJobsByContractId, createJob, getAllJobs, unpaidJobsSum } from '../controllers/job.controller'; 

const router = Router();

// Rota para criar um job
router.post('/', createJob);

// Rota para obter todos os jobs
router.get('/', getAllJobs);

// Rota para obter jobs de um contrato específico
router.get('/contract/:contractId', getJobsByContractId);

// Rota para obter a soma dos jobs não pagos
router.get('/unpaid/sum', unpaidJobsSum);

export default router;

