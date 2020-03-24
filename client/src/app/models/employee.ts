/**
 * Title: models/employee.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
export interface Employee {
  empid: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  photo?: string;
  designation?: string;
  password: string;
}
