import express from 'express';
import { publicRouter } from '$routes/api';

export const web = express();
const port = 3000;
web.use(express.json());
web.use(publicRouter);
web.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});