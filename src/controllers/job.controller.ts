import { Request, Response } from 'express';
import Job from '../models/job.model';

// Função para criar um novo Job
export const createJob = async (req: Request, res: Response) => {
  const { contractId, description, price, paid } = req.body;

  try {
    const newJob = await Job.create({
      contractId,
      description,
      price,
      paid,
    });
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Erro ao criar o Job:", error);
    res.status(500).json({ message: 'Erro ao criar o Job.', error });
  }
};

// Função para obter todos os Jobs
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Erro ao buscar os Jobs:", error);
    res.status(500).json({ message: 'Erro ao buscar os Jobs.', error });
  }
};

// Função para obter Jobs por Contract ID
export const getJobsByContractId = async (req: Request, res: Response) => {
  const { contractId } = req.params;

  try {
    const jobs = await Job.findAll({ where: { contractId } });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Erro ao buscar os Jobs por Contract ID:", error);
    res.status(500).json({ message: 'Erro ao buscar os Jobs por Contract ID.', error });
  }
};

// Função para retornar a soma dos Jobs não pagos
export const unpaidJobsSum = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.findAll({ where: { paid: false } });
    const totalUnpaid = jobs.reduce((sum, job) => sum + job.price, 0);
    return res.json({ totalUnpaid });
  } catch (error) {
    console.error("Erro ao calcular a soma dos Jobs não pagos:", error);
    res.status(500).json({ message: 'Erro ao calcular a soma dos Jobs não pagos.', error });
  }
};

// Função para obter todos os Jobs de um Contract
export const getJobsByContract = async (req: Request, res: Response) => {
  const { contractId } = req.params;

  try {
    const jobs = await Job.findAll({ where: { contractId } });
    return res.json(jobs);
  } catch (error) {
    console.error("Erro ao buscar Jobs de um Contract:", error);
    res.status(500).json({ message: 'Erro ao buscar Jobs de um Contract.', error });
  }
};