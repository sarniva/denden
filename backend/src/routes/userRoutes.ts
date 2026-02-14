import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { getUser } from "../controllers/userControllers";

const router = Router();

router.get("/",protectRoute,getUser);

export default router;