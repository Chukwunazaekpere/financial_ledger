import { Router } from 'express';
const appRouter = Router();
//========================= imports =====================
import transactionsRouter from './transactions';
import authRouter from './authentication';
//=======================================================

appRouter.use('/auth', authRouter);
appRouter.use('/transactions', transactionsRouter);

export default appRouter;
