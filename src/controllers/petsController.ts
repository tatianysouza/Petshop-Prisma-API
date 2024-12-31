import { Request, Response } from 'express';
import { Petshop, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPet = async (req: Request, res: Response): Promise<Response> => {
  const { name, type, description, deadline_vaccination } = req.body;
  const petshop: Petshop = req.petshop;

  const newPet = await prisma.pet.create({
    data: {
      name,
      type,
      description,
      deadline_vaccination: new Date(deadline_vaccination),
      petshopId: petshop.id,
    }
  });

  return res.status(201).json(newPet);
};

export const listPets = async (req: Request, res: Response): Promise<Response> => {
  const petshop: Petshop = req.petshop;
  const pets = await prisma.pet.findMany({ where: { petshopId: petshop.id } });

  return res.status(200).json(pets);
};

export const updatePet = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { name, type, description, deadline_vaccination } = req.body;
  const petshop: Petshop = req.petshop;

  const pet = await prisma.pet.findUnique({ where: { id } });

  if (!pet || pet.petshopId !== petshop.id) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  const updatedPet = await prisma.pet.update({
    where: { id },
    data: {
      name,
      type,
      description,
      deadline_vaccination: new Date(deadline_vaccination),
    },
  });

  return res.status(200).json(updatedPet);
};

export const vaccinatePet = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const petshop: Petshop = req.petshop;

  const pet = await prisma.pet.findUnique({ where: { id } });

  if (!pet || pet.petshopId !== petshop.id) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  const updatedPet = await prisma.pet.update({
    where: { id },
    data: { vaccinated: true },
  });

  return res.status(200).json(updatedPet);
};

export const deletePet = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const petshop: Petshop = req.petshop;

  const pet = await prisma.pet.findUnique({ where: { id } });

  if (!pet || pet.petshopId !== petshop.id) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  await prisma.pet.delete({ where: { id } });

  return res.status(200).json({ message: 'Pet excluído com sucesso' });
};
