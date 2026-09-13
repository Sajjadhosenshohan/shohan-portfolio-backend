"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoutes = void 0;
const express_1 = __importDefault(require("express"));
const skill_controller_1 = require("./skill.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/add-skill", (0, auth_1.default)(client_1.UserRole.ADMIN), multer_config_1.multerImageUpload.single("file"), (req, res, next) => {
    var _a;
    if (typeof req.body.data === "string") {
        try {
            req.body = JSON.parse(req.body.data);
        }
        catch (e) {
            // use req.body as is
        }
    }
    if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
        req.body.image = req.file.path;
    }
    next();
}, skill_controller_1.SkillsController.addSkillsIntoDB);
router.get("/", skill_controller_1.SkillsController.getAllSkillDataFromDB);
router.put("/update-skill", (0, auth_1.default)(client_1.UserRole.ADMIN), multer_config_1.multerImageUpload.single("file"), (req, res, next) => {
    var _a;
    if (typeof req.body.data === "string") {
        try {
            req.body = JSON.parse(req.body.data);
        }
        catch (e) {
            // use req.body as is
        }
    }
    if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
        req.body.image = req.file.path;
    }
    next();
}, skill_controller_1.SkillsController.updateSkillFromDB);
router.delete("/delete-skill", (0, auth_1.default)(client_1.UserRole.ADMIN), skill_controller_1.SkillsController.deleteSkillFromDB);
exports.SkillRoutes = router;
