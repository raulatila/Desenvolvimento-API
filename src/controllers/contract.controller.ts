import { Request, Response } from 'express';
import Contract from '../models/contract.model'; // Certifique-se de que o caminho está correto

// Função para criar um contrato
export const createContract = async (req: Request, res: Response): Promise<Response> => {
  const { clientId, terms, contractorId, operationDate, status } = req.body;

  try {
    const newContract = await Contract.create({ clientId, terms, contractorId, operationDate, status });
    return res.status(201).json({ message: 'Contrato criado com sucesso!', contract: newContract });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar contrato', error });
  }
};

// Função para obter um contrato pelo ID
export const getContractById = async (req: Request, res: Response): Promise<Response> => {
  const { contractId } = req.params;

  try {
    const contract = await Contract.findByPk(contractId);
    if (contract) {
      return res.status(200).json({ message: `Contrato com ID ${contractId} encontrado!`, contract });
    } else {
      return res.status(404).json({ message: 'Contrato não encontrado' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar contrato', error });
  }
};

// Função para listar todos os contratos
export const getAllContracts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const contracts = await Contract.findAll();
    return res.status(200).json({ message: 'Lista de contratos', contracts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao obter contratos', error });
  }
};