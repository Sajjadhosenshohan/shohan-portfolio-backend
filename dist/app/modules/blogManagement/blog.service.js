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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
    const { id, author, authorId, createdAt, updatedAt, publishDate } = payload, rest = __rest(payload, ["id", "author", "authorId", "createdAt", "updatedAt", "publishDate"]);
    const blogData = Object.assign(Object.assign({}, rest), { authorId: userInfo.id });
    if (publishDate) {
        blogData.publishDate = new Date(publishDate);
    }
    const result = yield prisma_1.default.blog.create({
        data: blogData,
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    profile_image: true,
                },
            },
        },
    });
    return result;
});
const getAllBlogDataFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.findMany({
        orderBy: { sortOrder: 'asc' },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    profile_image: true,
                },
            },
        },
    });
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
    yield prisma_1.default.blog.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const { id: _id, author, authorId, createdAt, updatedAt, publishDate } = blogInfo, rest = __rest(blogInfo, ["id", "author", "authorId", "createdAt", "updatedAt", "publishDate"]);
    const updateData = Object.assign({}, rest);
    if (publishDate) {
        updateData.publishDate = new Date(publishDate);
    }
    const result = yield prisma_1.default.blog.update({
        where: {
            id,
        },
        data: updateData,
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    profile_image: true,
                },
            },
        },
    });
    return result;
});
exports.blogServices = {
    addBlogDataIndoDB,
    getAllBlogDataFromDB,
    deletedBlogIntoDB,
    updateBlogIntoDB,
};
