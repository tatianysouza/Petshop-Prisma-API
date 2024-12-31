import { Router, Request, Response } from 'express';
import { createPet, listPets, updatePet, vaccinatePet, deletePet } from '../controllers/petsController';
import checkExistsUserAccount from '../middlewares/checkExistsUserAccount';

const router = Router();

router.use(checkExistsUserAccount);

// rota para criar pets
router.post('/pets', async (req: Request, res: any) => {
  try {
    const response = await createPet(req, res);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pet', details: error.message });
  }
});

// rota para listar os pets
router.get('/pets', async (req: Request, res: any) => {
  try {
    const response = await listPets(req, res);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pets', details: error.message });
  }
});

// rota para atualizar os pets
router.put('/pets/:id', async (req: Request, res: any) => {
  try {
    const response = await updatePet(req, res);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pet', details: error.message });
  }
});

// rota para atualizar a vacina dos pets
router.patch('/pets/:id/vaccinated', async (req: Request, res: any) => {
  try {
    const response = await vaccinatePet(req, res);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao vacinar pet', details: error.message });
  }
});

// rota para deletar os pets
router.delete('/pets/:id', async (req: Request, res: any) => {
  try {
    const response = await deletePet(req, res);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar pet', details: error.message });
  }
});

export default router;
