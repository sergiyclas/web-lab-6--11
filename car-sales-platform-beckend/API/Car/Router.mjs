import {Router} from 'express';
import {createCar, deleteCar, getCars, getCarsById, updateCar} from './Controller.mjs';
import cors from "cors";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = Router();
router.use(cors())

router.get('/', getCars);
router.get('/:id', getCarsById);
router.post('/', upload.single("image"), createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;
