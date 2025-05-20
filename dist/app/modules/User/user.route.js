"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post('/', user_controller_1.UserControllers.createUser);
router.get('/', 
// auth(UserRole.USER, UserRole.ADMIN),
user_controller_1.UserControllers.getAllUsersFromDB);
router.get('/:id', (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), user_controller_1.UserControllers.getUserByIdFromDB);
// router.patch(
//   '/:id',
//   auth(UserRole.USER, UserRole.ADMIN),
//   UserControllers.updateIntoDB,
// );
// router.delete(
//   '/:id',
//   auth(UserRole.ADMIN, UserRole.USER),
//   UserControllers.deleteFromDB,
// );
// router.delete(
//   '/soft/:id',
//   auth(UserRole.ADMIN, UserRole.USER),
//   UserControllers.softDeleteFromDB,
// );
exports.UserRoutes = router;
