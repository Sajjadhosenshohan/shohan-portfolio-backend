"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handlePrismaError = (err) => {
    var _a, _b;
    if (err.code === "P2002") {
        // Duplicate field error
        const target = (_a = err.meta) === null || _a === void 0 ? void 0 : _a.target;
        return {
            statusCode: http_status_1.default.CONFLICT,
            message: `Duplicate field error: ${Array.isArray(target) ? target.join(", ") : "unknown"}`,
        };
    }
    else if (err.code === "P2025") {
        console.log("error not found", err);
        // Record not found error
        return {
            statusCode: http_status_1.default.NOT_FOUND,
            message: `${(_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.modelName} not found`,
        };
    }
    else {
        // Other Prisma errors
        return {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: "Database error",
            error: err.message,
        };
    }
};
exports.handlePrismaError = handlePrismaError;
