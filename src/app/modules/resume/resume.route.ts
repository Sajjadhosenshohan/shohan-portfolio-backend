import express, { NextFunction, Request, Response } from "express";
import {
  ResumeController,
} from "./resume.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import {  upload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/add-resume",
  auth(UserRole.ADMIN),
  // upload.single("file"),
  // (req: Request, res: Response, next: NextFunction) => {
  //   if (req.file) {
  //     console.log("req.file", req.file);
  //   }
  //   next();
  // },
  ResumeController.addResumeIntoDB
);

router.get("/", ResumeController.getAllResumeDataFromDB);
// router.get("/preview", ResumeController?.ResumeGets?.streamResumePDF);

router.put(
  "/update-resume",
  auth(UserRole.ADMIN),
  // upload.single("file"),
  // (req: Request, res: Response, next: NextFunction) => {
  //   if (req.file) {
  //     console.log("req.file", req.file);
  //   }
  //   next();
  // },
  ResumeController.updateResumeFromDB
);
router.delete(
  "/delete-resume",
  auth(UserRole.ADMIN),
  ResumeController.deleteResumeFromDB
);

export const ResumeRoutes = router;
