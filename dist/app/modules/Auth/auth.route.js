"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validationRequest_1 = require("../../middlewares/validationRequest");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.AuthControllers.loginUser);
router.post('/refresh-token', auth_controller_1.AuthControllers.refreshToken);
router.post('/change-password', (0, validationRequest_1.validationRequest)(auth_validation_1.AuthValidation.passwordChangeSchema), (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), auth_controller_1.AuthControllers.changePassword);
router.post('/forgot-password', auth_controller_1.AuthControllers.forgotPassword);
router.post('/reset-password', auth_controller_1.AuthControllers.resetPassword);
exports.AuthRoutes = router;
