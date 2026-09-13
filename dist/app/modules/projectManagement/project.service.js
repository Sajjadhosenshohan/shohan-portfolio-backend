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
exports.projectServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const addProjectDataIndoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, authorId, technologies, createdAt, updatedAt } = payload, rest = __rest(payload, ["id", "authorId", "technologies", "createdAt", "updatedAt"]);
    const projectData = Object.assign({}, rest);
    if (Array.isArray(technologies) && technologies.length > 0) {
        projectData.technologies = {
            create: technologies.map((tech) => ({
                name: typeof tech === "string" ? tech : tech.name,
                icon: typeof tech === "object" && (tech === null || tech === void 0 ? void 0 : tech.icon) ? tech.icon : null,
            })),
        };
    }
    const result = yield prisma_1.default.project.create({
        data: projectData,
        include: {
            technologies: true,
        },
    });
    return result;
});
const getAllProjectDataFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.project.findMany({
        orderBy: { sortOrder: "asc" },
        include: { technologies: true },
    });
    return result;
});
const deletedProjectIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.project.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.project.delete({
        where: {
            id,
        },
    });
    return result;
});
const updateProjectIntoDB = (id, projectInfo) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.project.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const { id: _id, authorId, technologies, createdAt, updatedAt } = projectInfo, rest = __rest(projectInfo, ["id", "authorId", "technologies", "createdAt", "updatedAt"]);
    const updateData = Object.assign({}, rest);
    if (Array.isArray(technologies)) {
        // Replace technologies for this project
        yield prisma_1.default.technology.deleteMany({
            where: {
                projectId: id,
            },
        });
        if (technologies.length > 0) {
            updateData.technologies = {
                create: technologies.map((tech) => ({
                    name: typeof tech === "string" ? tech : tech.name,
                    icon: typeof tech === "object" && (tech === null || tech === void 0 ? void 0 : tech.icon) ? tech.icon : null,
                })),
            };
        }
    }
    const result = yield prisma_1.default.project.update({
        where: {
            id,
        },
        data: updateData,
        include: {
            technologies: true,
        },
    });
    return result;
});
exports.projectServices = {
    addProjectDataIndoDB,
    getAllProjectDataFromDB,
    deletedProjectIntoDB,
    updateProjectIntoDB,
};
