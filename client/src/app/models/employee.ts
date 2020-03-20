export interface Employee {
  empid: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  groups?: Array<string>;
  password: string;
}
