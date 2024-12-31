import { Router, Request, Response } from 'express';
import { createPetshop } from '../controllers/petshopsController';

const router = Router();

// rota para criar os petshops
router.post('/petshops', async (req: Request, res: any) => {
  try {
    const response = await createPetshop(req, res);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar petshop', details: error.message });
  }
});

export default router;
