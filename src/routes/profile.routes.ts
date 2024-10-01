// routes/profile.routes.ts
import { Router } from 'express';
import { createProfile, getProfileBalance, getProfileById, updateProfile, deleteProfile } from '../controllers/profile.controller'; 

const router = Router();

// Rota para criar um novo perfil (Profile)
router.post('/', createProfile);

// Rota para verificar o saldo de um perfil (Profile)
router.get('/:profileId/balance', getProfileBalance);

// Rota para obter um perfil por ID
router.get('/:profileId', getProfileById);

// Rota para atualizar um perfil
router.put('/:profileId', updateProfile);

// Rota para excluir um perfil
router.delete('/:profileId', deleteProfile);

export default router;