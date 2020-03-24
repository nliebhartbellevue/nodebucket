/**
 * Title: models/task.model.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
export class TaskModel {
  id: string;
  title: string;
  empid: string;
  skills: Array<any>;
  startDate: Date;
  endDate: Date;
  start: Date;
  end: Date;
  bgColor: string;
}
