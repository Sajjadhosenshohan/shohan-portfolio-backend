import express from "express";
import { ReorderController } from "./reorder.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  ReorderController.reorderEntities
);

export const ReorderRoutes = router;
