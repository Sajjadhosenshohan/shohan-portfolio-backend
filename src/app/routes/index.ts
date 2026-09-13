import { Router } from 'express';
import { blogRoutes } from '../modules/blogManagement/blog.route';
import { projectRoutes } from '../modules/projectManagement/project.route';
import {  MessageRoutes } from '../modules/contactMessageManagement/contact.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { SkillRoutes } from '../modules/skills/skill.route';
import { ResumeRoutes } from '../modules/resume/resume.route';
import { ReorderRoutes } from '../modules/reorder/reorder.route';

const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/projects',
    route: projectRoutes,
  },
  {
    path: '/skills',
    route: SkillRoutes,
  },
  {
    path: '/resume',
    route: ResumeRoutes,
  },
  {
    path: '/message',
    route: MessageRoutes,
  },
  {
    path: '/reorder',
    route: ReorderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

