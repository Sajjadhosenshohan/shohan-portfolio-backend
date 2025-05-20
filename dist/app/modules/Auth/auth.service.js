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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email
        },
    });
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'This user is not exist');
    }
    const isCurrectPassword = yield bcryptjs_1.default.compare(payload.password, userData.password);
    if (!isCurrectPassword) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid email or password');
    }
    const jwtPayload = {
        email: userData.email,
        id: userData.id,
        role: userData.role,
    };
    const accessToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.JWT.JWT_ACCESS_SECRET, config_1.default.JWT.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.JWT.JWT_REFRESH_SECRET, config_1.default.JWT.JWT_REFRESH_EXPIRES_IN);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = (0, auth_utils_1.verifyToken)(token, config_1.default.JWT.JWT_REFRESH_SECRET);
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    }
    catch (err) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not autherized!');
    }
    const isUserExists = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData === null || decodedData === void 0 ? void 0 : decodedData.email
        },
    });
    const jwtPayload = {
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        id: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.id,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    const accessToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.JWT.JWT_ACCESS_SECRET, config_1.default.JWT.JWT_ACCESS_EXPIRES_IN);
    return { accessToken };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email
        },
    });
    const isCurrectPassword = yield bcryptjs_1.default.compare(payload.oldPassword, userData.password);
    if (!isCurrectPassword) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Your Password is Wrong!');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(payload.newPassword, Number(config_1.default.BCRYPT_SALt_ROUNDS));
    yield prisma_1.default.user.update({
        where: {
            email: userData.email,
        },
        data: {
            password: hashedPassword,
        },
    });
    return;
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email
        },
    });
    console.log('user data', userData);
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Invalid email id');
    }
    const jwtPayload = {
        email: userData === null || userData === void 0 ? void 0 : userData.email,
        id: userData === null || userData === void 0 ? void 0 : userData.id,
        role: userData === null || userData === void 0 ? void 0 : userData.role,
    };
    const resetPasswordToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.JWT.JWT_RESET_PASSWORD_SECRET, config_1.default.JWT.JWT_RESET_PASSWORD_EXPIRES_IN);
    const resetPasswordLink = config_1.default.RESET_PASSWORD_LINK +
        `?userId=${userData.id}&token=${resetPasswordToken}`;
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #2E86C1;">Password Reset Request</h2>
      <p>Hi there,</p>
  
      <p>We received a request to reset your password for your <strong>Movie and Series Rating & Streaming Portal</strong> account.</p>
      <p>If you made this request, click the button below to reset your password:</p>
      <a href="${resetPasswordLink}" target="_blank" style="display: inline-block; margin: 20px 0; padding: 12px 20px; background-color: #2E86C1; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 15 minutes for your security.</p>
      <p>If you didn't request a password reset, you can safely ignore this email.</p>
      <p>Thanks,<br>The Movie and Series Rating & Streaming Portal Team</p>
    </div>
  `;
    yield (0, sendEmail_1.default)(userData.email, html);
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email
        },
    });
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isValidToken = (0, auth_utils_1.verifyToken)(token, config_1.default.JWT.JWT_RESET_PASSWORD_SECRET);
    if (!isValidToken) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Invalid token');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(payload.password, Number(config_1.default.BCRYPT_SALt_ROUNDS));
    yield prisma_1.default.user.update({
        where: {
            email: userData.email, //there i chaged 
        },
        data: {
            password: hashedPassword,
        },
    });
    return;
});
exports.AuthServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword,
};
