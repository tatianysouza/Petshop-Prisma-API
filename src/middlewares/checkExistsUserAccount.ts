import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkExistsUserAccount: RequestHandler = async (req, res, next) => {
  const cnpj = req.headers.cnpj as string;

  if (!cnpj) {
    res.status(400).json({ error: 'CNPJ não fornecido nos headers' });
    return;
  }

  const petshop = await prisma.petshop.findUnique({ where: { cnpj } });

  if (!petshop) {
    res.status(404).json({ error: 'Petshop não encontrado' });
    return;
  }

  req.petshop = petshop;
  next();
};

export default checkExistsUserAccount;
