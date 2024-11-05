import {Router} from "express";
import cors from "cors";
import carRouter from "./Car/Router.mjs"

const router = Router();
router.use(cors())

router.use("/cars", carRouter)

export default router;