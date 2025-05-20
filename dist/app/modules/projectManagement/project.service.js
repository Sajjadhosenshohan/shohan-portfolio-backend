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
exports.projectServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const addProjectDataIndoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.project.create({
        data: payload
    });
    return result;
});
const getAllProjectDataFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.project.findMany();
    return result;
});
const deletedProjectIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.project.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.project.delete({
        where: {
            id
        }
    });
    return result;
});
const updateProjectIntoDB = (id, projectInfo) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.project.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.project.update({
        where: {
            id
        },
        data: projectInfo
    });
    return result;
});
exports.projectServices = {
    addProjectDataIndoDB,
    getAllProjectDataFromDB,
    deletedProjectIntoDB,
    updateProjectIntoDB
};
