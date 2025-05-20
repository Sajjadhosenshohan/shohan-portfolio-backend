
export type TTechnology ={
  // id: string;
  name: string;
  icon?: string;
}
export type TProject = {
  id: string;
  title: string;
  description: string;
  features?: string[];
  project_image?: string | null;
  client_link?: string;
  server_link?: string;
  live_link?: string;
  technologies?: TTechnology[];
  authorId?: string;
  createdAt: string;
  updatedAt: string;
};
