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
exports.ResumeController = exports.updateResumeFromDB = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const resume_service_1 = require("./resume.service");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const addResumeIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = JSON.parse((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data);
    console.log("Controller data:", data);
    if (req.file) {
        const uploadsDir = path_1.default.join(process.cwd(), "public/resumes");
        // Ensure directory exists
        if (!fs_1.default.existsSync(uploadsDir)) {
            try {
                fs_1.default.mkdirSync(uploadsDir, { recursive: true });
            }
            catch (error) {
                throw new Error(`Failed to create uploads directory: ${error.message}`);
            }
        }
        const uniqueFilename = `${(0, uuid_1.v4)()}-${req.file.originalname}`;
        const filePath = path_1.default.join(uploadsDir, uniqueFilename);
        // Save file asynchronously
        try {
            yield fs_1.default.promises.writeFile(filePath, req.file.buffer);
            console.log("File saved at:", filePath);
            data.pdfUrl = `/api/resumes/${uniqueFilename}`;
            console.log("File URL sdfh:", data.pdfUrl);
        }
        catch (error) {
            throw new Error(`Failed to save file: ${error.message}`);
        }
    }
    // if (req.file) {
    //      // Instead of saving to filesystem, pass the buffer to the service
    //     //  data.pdfBuffer = req.file.buffer;
    //      // Optionally, you can still store a reference URL or ID
    //      data.pdfUrl = `/api/resumes/${Date.now()}-${req.file.originalname}`;
    //    }
    const result = yield resume_service_1.ResumeServices.addResumeIntoDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "New Resume added Successfully",
        data: result,
    });
}));
const getAllResumeDataFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_service_1.ResumeServices.getAllResumeDataFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "All Resume retrieved successfully",
        data: result,
    });
}));
// const updateResumeFromDB = catchAsync(async (req, res) => {
//    const {id, ...skillInfo} = req.body;
//   const result = await ResumeServices.updateResumeFromDB(id,skillInfo);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Resume updated successfully',
//     data: result,
//   });
// });
exports.updateResumeFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = JSON.parse((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data);
    console.log("Controller data:", data, req.file);
    if (req.file) {
        const uploadsDir = path_1.default.join(process.cwd(), "public/resumes");
        // Ensure directory exists
        if (!fs_1.default.existsSync(uploadsDir)) {
            try {
                fs_1.default.mkdirSync(uploadsDir, { recursive: true });
            }
            catch (error) {
                throw new Error(`Failed to create uploads directory: ${error.message}`);
            }
        }
        const uniqueFilename = `${(0, uuid_1.v4)()}-${req.file.originalname}`;
        const filePath = path_1.default.join(uploadsDir, uniqueFilename);
        // Save file asynchronously
        try {
            yield fs_1.default.promises.writeFile(filePath, req.file.buffer);
            // console.log("File saved at:", filePath);
            data.pdfUrl = `/api/resumes/${uniqueFilename}`;
            // console.log("File URL sdfh:", skillInfo.pdfUrl);
        }
        catch (error) {
            throw new Error(`Failed to save file: ${error.message}`);
        }
    }
    const result = yield resume_service_1.ResumeServices.updateResumeFromDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Resume updated successfully",
        data: result,
    });
}));
const deleteResumeFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resume_service_1.ResumeServices.deleteResumeFromDB(req.query.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Resume deleted successfully",
        data: result,
    });
}));
const ResumeGets = {
    streamResumePDF: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const pdfUrl = req.query.url;
        if (!pdfUrl) {
            return res.status(400).json({ message: "PDF URL is required" });
        }
        try {
            // Validate URL
            try {
                new URL(pdfUrl);
            }
            catch (_a) {
                return res.status(400).json({ message: "Invalid PDF URL" });
            }
            const response = yield axios_1.default.get(pdfUrl, {
                responseType: "stream",
            });
            const contentType = response.headers["content-type"];
            if (!contentType.includes("pdf")) {
                return res
                    .status(400)
                    .json({ message: "URL does not point to a PDF file" });
            }
            // Set headers
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "inline");
            // Stream the PDF
            response.data.pipe(res);
        }
        catch (error) {
            console.error("Failed to stream PDF:", error);
            res.status(500).json({ message: "Failed to load PDF" });
        }
    }),
};
exports.ResumeController = {
    addResumeIntoDB,
    getAllResumeDataFromDB,
    deleteResumeFromDB,
    updateResumeFromDB: exports.updateResumeFromDB,
    ResumeGets,
};
