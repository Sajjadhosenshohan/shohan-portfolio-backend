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
exports.ContactServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.default.EMAIL_USER,
        pass: config_1.default.EMAIL_PASS,
    },
});
const addMessageIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.message.create({
        data: payload,
    });
    // 2. Send email to your Gmail
    const mailOptions = {
        from: `"Your Portfolio Contact" <${config_1.default.EMAIL_USER}>`,
        to: "mdshohansajjad@gmail.com",
        subject: `New Message from ${payload.name}`,
        html: `
      <h3>You got a new message!</h3>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Message:</strong></p>
      <p>${payload.message}</p>
    `,
    };
    yield transporter.sendMail(mailOptions);
    return result;
});
const getAllMessageDataFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.message.findMany();
    return result;
});
const deleteMessageDataFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.message.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.message.delete({
        where: {
            id
        }
    });
    return result;
});
const getSingleMessageDataFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.message.findUniqueOrThrow({
        where: {
            id
        }
    });
    return result;
});
exports.ContactServices = {
    addMessageIntoDB,
    getAllMessageDataFromDB,
    deleteMessageDataFromDB,
    getSingleMessageDataFromDB
};
