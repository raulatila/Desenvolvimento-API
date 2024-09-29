import { Request, Response } from 'express';
import Profile from '../models/profile.model'; // Certifique-se de que o caminho está correto

// Função para criar um novo perfil (Profile)
export const createProfile = async (req: Request, res: Response) => {
  const { name, balance } = req.body;

  try {
    const newProfile = await Profile.create({ name, balance });
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o perfil.', error });
  }
};

// Função para obter o saldo de um perfil (Profile)
export const getProfileBalance = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  try {
    const profile = await Profile.findByPk(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Perfil não encontrado.' });
    }

    res.status(200).json({ balance: profile.balance });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o saldo do perfil.', error });
  }
};
