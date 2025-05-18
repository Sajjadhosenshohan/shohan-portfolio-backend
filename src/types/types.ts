// export interface TBlog {
//   _id: string;
//   title: string;
//   short_description: string;
//   long_description: string;
//   image: string;
//   author: {
//     email: string;
//     image: string;
//     name: string;
//   };
// }
// export interface TProject {
//   _id: string;
//   title: string;
//   live_link: string;
//   client_link: string;
//   server_link: string;
//   short_description: string;
//   long_description: string;
//   technology: string;
//   image: string;
//   author: {
//     email: string;
//     image: string;
//     name: string;
//   };
// }

// export interface TMessage {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   subject: string;
//   message: string;
// }

// export interface SkillData {
//   id: string;
//   name: string;
//   iconPath: string; // Path relative to the public folder e.g., /icons/javascript.png
//   color?: string;
//   description: string;
// }


// // Project data structure
// export type ProjectFeature = string;

// export interface ProjectTech {
//   name: string;
//   icon: React.ReactNode;
// }
// export interface Project {
//   id: string;
//   name: string;
//   description: string;
//   features: ProjectFeature[];
//   image: string;
//   tech: ProjectTech[];
//   githubFrontend: string;
//   githubBackend?: string;
//   live: string;
// }