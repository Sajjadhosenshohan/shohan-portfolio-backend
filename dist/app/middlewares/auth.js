"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("../modules/Auth/auth.utils");
const config_1 = __importDefault(require("../config"));
const prisma_1 = __importDefault(require("../shared/prisma"));
const AppError_1 = __importDefault(require("../error/AppError"));
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
            }
            const verifyUser = (0, auth_utils_1.verifyToken)(token, config_1.default.JWT.JWT_ACCESS_SECRET);
            if (roles.length && !roles.includes(verifyUser.role)) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
            }
            const userData = yield prisma_1.default.user.findUniqueOrThrow({
                where: {
                    email: verifyUser === null || verifyUser === void 0 ? void 0 : verifyUser.email
                },
            });
            if (!userData) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User is Not Found!');
            }
            req.user = verifyUser;
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = auth;
