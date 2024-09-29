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
    res.status(500).json({ message: 'Erro ao criar o Job.', error });
  }
};

// Função para obter todos os Jobs
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
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
    res.status(500).json({ message: 'Erro ao buscar os Jobs por Contract ID.', error });
  }
};

// 2. Retornar soma dos Jobs não pagos integralmente
export const unpaidJobsSum = async (req: Request, res: Response) => {
  const jobs = await Job.findAll({ where: { paid: false } });
  const totalUnpaid = jobs.reduce((sum, job) => sum + job.price, 0);
  return res.json({ totalUnpaid });
};

// 4. Retornar todos os Jobs de um Contract
export const getJobsByContract = async (req: Request, res: Response) => {
  const { contractId } = req.params;
  const jobs = await Job.findAll({ where: { contractId } });
  return res.json(jobs);
};