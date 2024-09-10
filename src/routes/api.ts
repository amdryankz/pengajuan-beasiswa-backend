import express from 'express';
import * as DonorController from "$controllers/DonorController"
import { authenticateJWT } from 'middlewares/AuthMiddleware';

export const apiRouter = express.Router();
apiRouter.use(authenticateJWT);

apiRouter.get('/admin/donors', DonorController.getAll);
apiRouter.post('/admin/donors', DonorController.create);
apiRouter.put('/admin/donors/:id', DonorController.update);
apiRouter.delete('/admin/donors/:id', DonorController.deleteDonor);