import { Router } from 'express';
import controllers from '../controllers';


const router: Router = Router();

router.post("/deposit", controllers.depositController);
router.get("/account", controllers.accountController);
router.post("/withdrawal", controllers.withdrawalController);
router.post("/transfer", controllers.transferController);


export default router;