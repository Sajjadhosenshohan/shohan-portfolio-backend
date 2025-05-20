"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/add-blog", (0, auth_1.default)(client_1.UserRole.ADMIN), multer_config_1.multerImageUpload.single("file"), (req, res, next) => {
    var _a;
    req.body = JSON.parse(req.body.data);
    if (req.file) {
        req.body.blog_image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    }
    next();
}, blog_controller_1.blogController.addBlogData);
router.get("/", blog_controller_1.blogController.getAllBlogData);
router.delete("/delete-blog", (0, auth_1.default)(client_1.UserRole.ADMIN), blog_controller_1.blogController.deleteBlogData);
router.put("/update-blog", (0, auth_1.default)(client_1.UserRole.ADMIN), multer_config_1.multerImageUpload.single("file"), (req, res, next) => {
    var _a;
    req.body = JSON.parse(req.body.data);
    if (req.file) {
        req.body.blog_image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    }
    next();
}, blog_controller_1.blogController.updateBlogData);
exports.blogRoutes = router;
