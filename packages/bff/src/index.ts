import * as express from 'express';

import { router as deviceRouter } from './routes/device.routes';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/v1', deviceRouter);

app.listen(port, () => {
  console.log(`BFF service running at http://localhost:${port}`);
});
