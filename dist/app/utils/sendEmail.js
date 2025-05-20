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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: config_1.default.NODE_ENV === 'production',
        auth: {
            user: config_1.default.EMAIL_USER,
            pass: config_1.default.EMAIL_PASS,
        },
        tls: {
            minVersion: 'TLSv1.2', // this one i added
            rejectUnauthorized: false,
        },
        socketTimeout: 60000,
    });
    yield transporter.sendMail({
        // add there only website name
        from: `"Movie and Series Rating & Streaming Portal" <${config_1.default.EMAIL_USER}>`,
        to,
        subject: 'Rest Password Link',
        html,
    });
});
exports.default = sendEmail;
