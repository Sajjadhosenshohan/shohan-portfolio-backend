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
exports.ReorderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const reorder_service_1 = require("./reorder.service");
const reorderEntities = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { entity, orderedIds } = req.body;
    if (!entity || !orderedIds || !Array.isArray(orderedIds)) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            success: false,
            message: "entity and orderedIds array are required",
            data: null,
        });
    }
    const validEntities = ["resume", "project", "blog", "skill"];
    if (!validEntities.includes(entity)) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            success: false,
            message: `Invalid entity. Must be one of: ${validEntities.join(", ")}`,
            data: null,
        });
    }
    const result = yield reorder_service_1.ReorderServices.reorderEntities(entity, orderedIds);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: result.message,
        data: result,
    });
}));
exports.ReorderController = {
    reorderEntities,
};
