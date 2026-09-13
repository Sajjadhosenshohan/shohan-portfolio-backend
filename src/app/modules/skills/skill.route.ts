import express, { NextFunction, Request, Response } from "express";
import { SkillsController } from "./skill.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { multerImageUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/add-skill",
  auth(UserRole.ADMIN),
  multerImageUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.data === "string") {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (e) {
        // use req.body as is
      }
    }
    if (req.file?.path) {
      req.body.image = req.file.path;
    }
    next();
  },
  SkillsController.addSkillsIntoDB
);
router.get("/", SkillsController.getAllSkillDataFromDB);
router.put(
  "/update-skill",
  auth(UserRole.ADMIN),
  multerImageUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.data === "string") {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (e) {
        // use req.body as is
      }
    }
    if (req.file?.path) {
      req.body.image = req.file.path;
    }
    next();
  },
  SkillsController.updateSkillFromDB
);
router.delete(
  "/delete-skill",
  auth(UserRole.ADMIN),
  SkillsController.deleteSkillFromDB
);

export const SkillRoutes = router;
