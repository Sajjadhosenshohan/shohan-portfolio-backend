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
exports.ReorderServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const reorderEntities = (entity, orderedIds) => __awaiter(void 0, void 0, void 0, function* () {
    const modelMap = {
        resume: prisma_1.default.resume,
        project: prisma_1.default.project,
        blog: prisma_1.default.blog,
        skill: prisma_1.default.skill,
    };
    const model = modelMap[entity];
    if (!model) {
        throw new Error(`Invalid entity: ${entity}`);
    }
    // Use a transaction to update all sortOrders atomically
    const updates = orderedIds.map((id, index) => model.update({
        where: { id },
        data: { sortOrder: index },
    }));
    yield prisma_1.default.$transaction(updates);
    return { message: `${entity} order updated successfully` };
});
exports.ReorderServices = {
    reorderEntities,
};
