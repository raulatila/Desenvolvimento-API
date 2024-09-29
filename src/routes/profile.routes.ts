import { Router } from 'express';
import { createProfile, getProfileBalance } from '../controllers/profile.controller'; 

const router = Router();

// Rota para criar um novo perfil (Profile)
router.post('/', createProfile);

// Rota para verificar o saldo de um perfil (Profile)
router.get('/:profileId/balance', getProfileBalance);

export default router;
