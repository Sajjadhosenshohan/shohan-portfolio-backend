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
exports.seedDatabase = exports.seedSkills = exports.seedAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
const prisma_1 = __importDefault(require("../shared/prisma"));
const seedSkills_1 = require("./seedSkills");
Object.defineProperty(exports, "seedSkills", { enumerable: true, get: function () { return seedSkills_1.seedSkills; } });
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminEmail = config_1.default.ADMIN_EMAIL;
        const adminPassword = config_1.default.ADMIN_PASSWORD;
        const existingAdmin = yield prisma_1.default.user.findFirst({
            where: {
                role: 'ADMIN',
            },
        });
        if (existingAdmin) {
            console.log('Admin already exists. Skipping seeding.');
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(adminPassword, Number(config_1.default.BCRYPT_SALt_ROUNDS || 12));
        const admin = yield prisma_1.default.user.create({
            data: {
                name: 'Sajjad',
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN',
            },
        });
        console.log('Admin created successfully:', admin.email);
    }
    catch (error) {
        console.error('Error seeding admin:', error);
    }
});
exports.seedAdmin = seedAdmin;
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.seedAdmin)();
    yield (0, seedSkills_1.seedSkills)();
});
exports.seedDatabase = seedDatabase;
if (require.main === module) {
    (0, exports.seedDatabase)()
        .then(() => {
        console.log('Database seeding finished.');
        process.exit(0);
    })
        .catch((err) => {
        console.error('Database seeding failed:', err);
        process.exit(1);
    });
}
