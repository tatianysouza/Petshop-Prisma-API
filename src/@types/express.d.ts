import { Petshop } from '@prisma/client'; 

declare global {
  namespace Express {
    interface Request {
      petshop: Petshop; 
    }
  }
}
