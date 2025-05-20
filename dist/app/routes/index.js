"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_route_1 = require("../modules/blogManagement/blog.route");
const project_route_1 = require("../modules/projectManagement/project.route");
const contact_route_1 = require("../modules/contactMessageManagement/contact.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/User/user.route");
const skill_route_1 = require("../modules/skills/skill.route");
const resume_route_1 = require("../modules/resume/resume.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/blogs',
        route: blog_route_1.blogRoutes,
    },
    {
        path: '/projects',
        route: project_route_1.projectRoutes,
    },
    {
        path: '/skills',
        route: skill_route_1.SkillRoutes,
    },
    {
        path: '/resume',
        route: resume_route_1.ResumeRoutes,
    },
    {
        path: '/message',
        route: contact_route_1.MessageRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
