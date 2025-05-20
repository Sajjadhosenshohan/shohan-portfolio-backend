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
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const auth_utils_1 = require("../Auth/auth.utils");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcryptjs_1.default.hash(data.password, Number(config_1.default.BCRYPT_SALt_ROUNDS));
    const userData = Object.assign(Object.assign({}, data), { password: hashPassword });
    const existingUser = yield prisma_1.default.user.findUnique({
        where: {
            email: userData.email,
        },
    });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const result = yield prisma_1.default.user.create({
        data: userData,
    });
    const jwtPayload = {
        email: result.email,
        id: result.id,
        role: result.role,
    };
    const accessToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.JWT.JWT_ACCESS_SECRET, config_1.default.JWT.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.JWT.JWT_REFRESH_SECRET, config_1.default.JWT.JWT_REFRESH_EXPIRES_IN);
    return {
        accessToken,
        refreshToken,
    };
});
const getAllUsersFromDB = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const result = yield prisma_1.default.user.findMany({
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.user.count();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getUserByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id
        },
    });
    if (!result) {
        throw new Error('User not found');
    }
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        },
    });
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: Object.assign({}, payload),
    });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
const softDeleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    // await prisma.user.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     status: UserStatus.DELETED,
    //   },
    // });
    return;
});
exports.UserService = {
    createUser,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB,
};
