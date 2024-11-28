import {Router} from "express";
import cors from "cors";
import { register, login } from './Controller.mjs';
const router = Router();
router.use(cors())

router.post('/register', register);
router.post('/login', login);

export default router;