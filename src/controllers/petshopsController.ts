import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const validateCNPJ = (cnpj: string) => {
  const cnpjRegex = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/;
  return cnpjRegex.test(cnpj);
};

export const createPetshop = async (req: Request, res: Response): Promise<Response> => {
  const { name, cnpj } = req.body;

  if (!name || !cnpj) {
    return res.status(400).json({ error: 'Name e CNPJ são obrigatórios' });
  }

  if (!validateCNPJ(cnpj)) {
    return res.status(400).json({ error: 'CNPJ inválido' });
  }

  const existingPetshop = await prisma.petshop.findUnique({ where: { cnpj } });

  if (existingPetshop) {
    return res.status(409).json({ error: 'CNPJ já cadastrado' });
  }

  const newPetshop = await prisma.petshop.create({
    data: {
      name,
      cnpj,
    },
  });

  return res.status(201).json(newPetshop);
};
