"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleZodError = (err) => {
    const ZodError = err.issues.map((issue) => {
        return {
            path: issue.path.join(">>>"),
            message: issue.message,
        };
    });
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        message: "Zod Validation error",
        error: ZodError,
    };
};
exports.handleZodError = handleZodError;
