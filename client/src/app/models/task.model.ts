export interface Task {
  id?: string;
  description: string;
  status: string;
  assignedStaff: string|null;
}
