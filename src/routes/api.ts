import express from 'express';
import * as DonorController from "$controllers/DonorController"
import * as FileRequirementController from "$controllers/FileRequirementController"
import { authenticateJWT } from 'middlewares/AuthMiddleware';

export const apiRouter = express.Router();
apiRouter.use(authenticateJWT);

apiRouter.get('/admin/donors', DonorController.getAll);
apiRouter.post('/admin/donors', DonorController.create);
apiRouter.put('/admin/donors/:id', DonorController.update);
apiRouter.delete('/admin/donors/:id', DonorController.deleteById);

apiRouter.get('/admin/file-requirement', FileRequirementController.getAll);
apiRouter.post('/admin/file-requirement', FileRequirementController.create);
apiRouter.put('/admin/file-requirement/:id', FileRequirementController.update);
apiRouter.delete('/admin/file-requirement/:id', FileRequirementController.deleteById);