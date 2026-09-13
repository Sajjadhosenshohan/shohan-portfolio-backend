import express from "express";
import { projectController } from "./project.controller";
import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { multerImageUpload } from "../../config/multer.config";
const router = express.Router();

router.post(
  "/add-project",
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
      req.body.project_image = req.file.path;
    }
    next();
  },
  projectController.addProjectData
);

router.get("/", projectController.getAllProjectData);
router.delete(
  "/delete-project",
  auth(UserRole.ADMIN),
  projectController.deleteProjectData
);
router.put(
  "/update-project",
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
      req.body.project_image = req.file.path;
    }
    next();
  },
  projectController.updateProjectData
);

export const projectRoutes = router;
