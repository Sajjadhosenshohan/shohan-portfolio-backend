"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const zodError_1 = require("./zodError");
const prismaErrorHandler_1 = require("./prismaErrorHandler");
const AppError_1 = __importDefault(require("./AppError"));
const isDevelopment = process.env.NODE_ENV === "development";
const globalErrorHandler = (error, _req, res, _next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorDetails = undefined;
    // Handle Zod Validation Error
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodError_1.handleZodError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorDetails = {
            details: simplifiedError.error,
        };
    }
    // Handle Prisma Errors
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = (0, prismaErrorHandler_1.handlePrismaError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorDetails = simplifiedError.error ? { details: simplifiedError.error } : undefined;
    }
    // Handle Custom AppError
    else if (error instanceof AppError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
    }
    // Handle Generic Error
    else if (error instanceof Error) {
        message = error.message || message;
        statusCode = error.statusCode || statusCode;
    }
    // Send response
    res.status(statusCode).json(Object.assign(Object.assign({ success: false, status: statusCode, message }, (errorDetails && { errorDetails })), (isDevelopment && error instanceof Error && { stack: error.stack })));
};
exports.globalErrorHandler = globalErrorHandler;
