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
exports.blogServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const addBlogDataIndoDB = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email,
        },
    });
    const result = yield prisma_1.default.blog.create({
        data: Object.assign(Object.assign({}, payload), { authorId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id }),
    });
    return result;
});
const getAllBlogDataFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.findMany();
    return result;
});
const deletedBlogIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.blog.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.blog.delete({
        where: {
            id,
        },
    });
    return result;
});
const updateBlogIntoDB = (id, blogInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield prisma_1.default.blog.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.blog.update({
        where: {
            id,
        },
        data: blogInfo,
    });
    return result;
});
exports.blogServices = {
    addBlogDataIndoDB,
    getAllBlogDataFromDB,
    deletedBlogIntoDB,
    updateBlogIntoDB,
};
