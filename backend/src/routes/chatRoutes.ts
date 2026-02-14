import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { getChat, getOrCreateChat } from "../controllers/chatControllers";

const router = Router();

router.use(protectRoute);

router.get("/",getChat);
router.post("/with/:participantId",getOrCreateChat);

export default router;