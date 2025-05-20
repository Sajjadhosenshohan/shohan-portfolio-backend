"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const contact_controller_1 = require("./contact.controller");
const router = express_1.default.Router();
router.post('/add-message', contact_controller_1.ContactController.addMessageData);
router.get('/', (0, auth_1.default)(client_1.UserRole.ADMIN), contact_controller_1.ContactController.getAllMessageData);
router.get('/get-single-message', (0, auth_1.default)(client_1.UserRole.ADMIN), contact_controller_1.ContactController.getSingleMessageDataFromDB);
router.delete('/delete-message', (0, auth_1.default)(client_1.UserRole.ADMIN), contact_controller_1.ContactController.deleteMessageDataFromDB);
exports.MessageRoutes = router;
