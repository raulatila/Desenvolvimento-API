// controllers/deposit.controller.ts
import { Request, Response } from 'express';
import Deposit from '../models/deposit.model';

// Função para criar depósito
export const createDeposit = async (req: Request, res: Response) => {
  const { clientId, depositValue, operationDate } = req.body;

  // Validação de valor negativo
  if (depositValue <= 0) {
    return res.status(400).json({ message: 'O valor do depósito deve ser positivo.' });
  }

  try {
    const newDeposit = await Deposit.create({
      clientId,
      depositValue,
      operationDate: new Date(operationDate),
    });
    return res.status(201).json(newDeposit);
  } catch (error) {
    console.error("Erro ao criar o depósito:", error);
    return res.status(500).json({ message: 'Erro ao criar o depósito.', error: String(error) });
  }
};

// Função para obter todos os depósitos
export const findAllDeposits = async (req: Request, res: Response) => {
  try {
    const deposits = await Deposit.findAll();
    return res.status(200).json(deposits);
  } catch (error) {
    console.error("Erro ao obter depósitos:", error);
    return res.status(500).json({ message: 'Erro ao obter depósitos.', error: String(error) });
  }
};

// Função para obter um depósito pelo ID
export const findDepositById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deposit = await Deposit.findByPk(id);
    if (!deposit) {
      return res.status(404).json({ message: 'Depósito não encontrado.' });
    }
    return res.status(200).json(deposit);
  } catch (error) {
    console.error("Erro ao obter depósito:", error);
    return res.status(500).json({ message: 'Erro ao obter depósito.', error: String(error) });
  }
};

// Função para atualizar um depósito pelo ID
export const updateDeposit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { clientId, depositValue, operationDate } = req.body;

  try {
    const deposit = await Deposit.findByPk(id);
    if (!deposit) {
      return res.status(404).json({ message: 'Depósito não encontrado.' });
    }

    deposit.clientId = clientId !== undefined ? clientId : deposit.clientId;
    deposit.depositValue = depositValue !== undefined ? depositValue : deposit.depositValue;
    deposit.operationDate = operationDate ? new Date(operationDate) : deposit.operationDate;

    await deposit.save();
    return res.status(200).json(deposit);
  } catch (error) {
    console.error("Erro ao atualizar depósito:", error);
    return res.status(500).json({ message: 'Erro ao atualizar depósito.', error: String(error) });
  }
};

// Função para excluir um depósito pelo ID
export const deleteDeposit = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deposit = await Deposit.findByPk(id);
    if (!deposit) {
      return res.status(404).json({ message: 'Depósito não encontrado.' });
    }

    await deposit.destroy();
    return res.status(204).send(); // No content
  } catch (error) {
    console.error("Erro ao excluir depósito:", error);
    return res.status(500).json({ message: 'Erro ao excluir depósito.', error: String(error) });
  }
};