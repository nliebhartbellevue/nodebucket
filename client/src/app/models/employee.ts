export class Employee {
  constructor(
    public empid: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public groups: Array<string>,
    public password: string
  ) {}
}
