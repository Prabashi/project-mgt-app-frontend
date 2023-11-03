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

// export enum MessageType {
//   Success = "success",
//   Error = "error",
//   Warning = "warning",
//   Info = "info",
// }

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Inherit = "inherit",
}

export enum Status {
  ToDo = "TODO",
  InProgress = "IN PROGRESS",
  InQA = "IN QA",
  Done = "DONE",
}

export enum Priority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  Highest = "HIGHEST",
}

export enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

export const TASK_STATUS_LIST = [
  Status.ToDo,
  Status.InProgress,
  Status.InQA,
  Status.Done,
];

export const PRIORITY_LIST = [
  Priority.Low,
  Priority.Medium,
  Priority.High,
  Priority.Highest,
];

export const STATUS_LIST = [Status.Active, Status.Inactive];
