export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  profile_image: string | undefined;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}
