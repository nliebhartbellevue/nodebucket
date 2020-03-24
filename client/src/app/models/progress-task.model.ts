/**
 * Title: models/progress-task.modele.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
export class ProgressTaskModel {
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