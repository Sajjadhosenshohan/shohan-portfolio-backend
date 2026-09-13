import express, { NextFunction, Request, Response } from "express";
import { blogController } from "./blog.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { multerImageUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/add-blog",
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
      req.body.blog_image = req.file.path;
    }
    next();
  },
  blogController.addBlogData
);
router.get("/", blogController.getAllBlogData);
router.delete(
  "/delete-blog",
  auth(UserRole.ADMIN),
  blogController.deleteBlogData
);
router.put(
  "/update-blog",
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
      req.body.blog_image = req.file.path;
    }
    next();
  },
  blogController.updateBlogData
);

export const blogRoutes = router;
