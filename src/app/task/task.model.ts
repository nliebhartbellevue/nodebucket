/**
 * Title: task/task.model.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
export interface Task {
  id: string;
  title: string;
  content: string;
  done: boolean;
  creator: string;
}
