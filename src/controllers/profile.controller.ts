import { Request, Response } from 'express';
import Profile from '../models/profile.model'; // Certifique-se de que o caminho está correto

// Função para criar um novo perfil
export const createProfile = async (req: Request, res: Response) => {
    const { firstname, lastname, profession, balance, type } = req.body;

    try {
        const newProfile = await Profile.create({ firstname, lastname, profession, balance, type });
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o perfil.', error });
    }
};

// Função para obter o saldo de um perfil
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

// Função para obter um perfil específico
export const getProfileById = async (req: Request, res: Response) => {
    const { profileId } = req.params;

    try {
        const profile = await Profile.findByPk(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o perfil.', error });
    }
};

// Função para atualizar um perfil
export const updateProfile = async (req: Request, res: Response) => {
    const { profileId } = req.params;
    const { firstname, lastname, profession, balance, type } = req.body;

    try {
        const profile = await Profile.findByPk(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }

        // Salvar saldo anterior antes da atualização
        const previousBalance = profile.balance;

        // Atualiza os campos do perfil
        profile.firstname = firstname || profile.firstname;
        profile.lastname = lastname || profile.lastname;
        profile.profession = profession || profile.profession;
        profile.balance = balance !== undefined ? balance : profile.balance; // Atualiza o saldo
        profile.type = type || profile.type;

        await profile.save();

        // Checar se o saldo está negativo
        if (profile.balance < 0) {
            return res.status(200).json({
                profile,
                message: 'Este perfil está devendo.'
            });
        } else if (previousBalance < 0 && profile.balance >= 0) {
            // Se o saldo anterior era negativo e agora é não negativo
            return res.status(200).json({
                profile,
                message: 'O saldo foi corrigido e não está mais devendo.'
            });
        } else if (previousBalance >= 0 && profile.balance < previousBalance) {
            // Se o saldo foi reduzido, mas continua positivo
            return res.status(200).json({
                profile,
                message: 'O saldo foi reduzido, mas o perfil ainda está em dia.'
            });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o perfil.', error });
    }
};

// Função para excluir um perfil
export const deleteProfile = async (req: Request, res: Response) => {
    const { profileId } = req.params;

    try {
        const profile = await Profile.findByPk(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }

        await profile.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir o perfil.', error });
    }
};