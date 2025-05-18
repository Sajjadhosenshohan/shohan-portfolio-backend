
export type TProject = {
  id: string;
  title: string;
  description: string;
  project_image?: string | null;
  client_link?: string;
  server_link?: string;
  live_link?: string;
  technologies?: string[];
  authorId?: string;
  createdAt: string;
  updatedAt: string;
};
