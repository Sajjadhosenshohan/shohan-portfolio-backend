"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/error/globalErrorHandler");
const app = (0, express_1.default)();
const corseOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
    ],
    credentials: true,
};
app.use((0, cors_1.default)(corseOptions));
// Serve static files from public/uploads
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'public/uploads')));
// parder
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// application routes
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send({
        status: true,
        database: process.env.DATABASE_URL ? `LOADED SUCCESSFULLY ${process.env.DATABASE_URL}` : "NOT LOADED (UNDEFINED)",
        message: 'Shohan portfolio server is running..!',
    });
});
// for global error
app.use(globalErrorHandler_1.globalErrorHandler);
// for not found route
app.use(notFound_1.default);
exports.default = app;
