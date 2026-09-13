"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReorderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const reorder_controller_1 = require("./reorder.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN), reorder_controller_1.ReorderController.reorderEntities);
exports.ReorderRoutes = router;
