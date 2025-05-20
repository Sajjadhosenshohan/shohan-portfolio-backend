"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required!' }),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
    }),
});
const passwordChangeSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z
            .string()
            .min(4, 'Old password must be at least 4 characters long'),
        newPassword: zod_1.z
            .string()
            .min(4, 'New password must be at least 4 characters long')
            .refine((val) => val !== '', 'New password cannot be empty'),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    passwordChangeSchema,
};
