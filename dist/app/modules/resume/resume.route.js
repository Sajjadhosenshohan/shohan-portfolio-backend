"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const resume_controller_1 = require("./resume.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/add-resume", (0, auth_1.default)(client_1.UserRole.ADMIN), multer_config_1.upload.single("file"), (req, res, next) => {
    if (req.file) {
        console.log("req.file", req.file);
    }
    next();
}, resume_controller_1.ResumeController.addResumeIntoDB);
router.get("/", resume_controller_1.ResumeController.getAllResumeDataFromDB);
// router.get("/preview", ResumeController?.ResumeGets?.streamResumePDF);
router.put("/update-resume", (0, auth_1.default)(client_1.UserRole.ADMIN), multer_config_1.upload.single("file"), (req, res, next) => {
    if (req.file) {
        console.log("req.file", req.file);
    }
    next();
}, resume_controller_1.ResumeController.updateResumeFromDB);
router.delete("/delete-resume", (0, auth_1.default)(client_1.UserRole.ADMIN), resume_controller_1.ResumeController.deleteResumeFromDB);
exports.ResumeRoutes = router;
