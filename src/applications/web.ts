import express from 'express';
import { publicRouter } from '$routes/public-api';
import { apiRouter } from '$routes/api';
import { userRouter } from '$routes/user-api';

export const web = express();
const port = 3000;
web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(userRouter);
web.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});