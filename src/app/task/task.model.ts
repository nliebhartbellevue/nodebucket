/**
 * Title: task/task.model.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
export interface Task {
  _id?: string;
  title: string;
  content: string;
  status?: string;
  assignedTo?: string;
  createdBy?: string;
  lastModifiedBy?: string;
}
