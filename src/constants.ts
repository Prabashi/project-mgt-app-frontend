export const BACKEND_BASE_URL = "http://localhost:8000";

export type ErrorResponse = {
  message: string;
};

export enum Roles {
  Admin = "ADMIN",
  Lead = "LEAD",
  ProjectManager = "PROJECT_MANAGER",
  User = "USER",
}
