"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/add-project", (0, auth_1.default)(client_1.UserRole.ADMIN), multer_config_1.multerImageUpload.single("file"), (req, res, next) => {
    var _a;
    console.log(req.body, req.file);
    req.body = JSON.parse(req.body.data);
    if (req.file) {
        req.body.project_image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    }
    next();
}, project_controller_1.projectController.addProjectData);
router.get("/", project_controller_1.projectController.getAllProjectData);
router.delete("/delete-project", (0, auth_1.default)(client_1.UserRole.ADMIN), project_controller_1.projectController.deleteProjectData);
router.put("/update-project", (0, auth_1.default)(client_1.UserRole.ADMIN), multer_config_1.multerImageUpload.single("file"), (req, res, next) => {
    var _a;
    req.body = JSON.parse(req.body.data);
    if (req.file) {
        req.body.project_image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    }
    next();
}, project_controller_1.projectController.updateProjectData);
exports.projectRoutes = router;
