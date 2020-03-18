/**
 * Title: services/auth/employees-auth.service.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import jwt from "jsonwebtoken";
import PasswordService from "./password.service";
import { Employee } from "../../models";

export default class EmployeeAuthService {
  #passwordService;

  constructor() {
    this.#passwordService = new PasswordService(10);
  }

  /**
   * @param {*} employee
   */
  async signUp(employee) {
    if (!employee) throw new Error("Please provide valid employee!");

    const emp = employee;
    const hashedPassword = await this.#passwordService.hash(
      emp.credential.password
    );

    emp.credential.password = hashedPassword;

    const insertedEmployee = await new Employee(emp).save();
    const employeePOJO = insertedEmployee.toObject();

    return this.generateAccessToken(employeePOJO);
  }

  /**
   * @param {string} empid
   * @param {string} password
   */
  async signIn(empid, password) {
    const employee = await Employee.findOne({ empid: empid });

    if (!employee) return null;

    if (
      (await this.#passwordService.check(
        password,
        employee.credential.password
      )) === true
    ) {
      return this.generateAccessToken(employee.toObject());
    }

    return null;
  }

  /**
   * @param {*} employee
   */
  generateAccessToken(employee) {
    "use strict";

    if (!employee) throw new Error("Please enter a valid employee!");

    let employeeData = null;

    // use block of code to forbid upper-level method code
    {
      // nullify credential
      employeeData = { ...employee, credential: null };

      // remove credential property
      delete employeeData.credential;

      // make immutable
      Object.freeze(employeeData);
    }

    const jwtPayload = {
      employee: employeeData
    };

    console.log(
      "ISSUER",
      "top secret",
      "nodebucket.com"
    );

    const token = jwt.sign(
      jwtPayload,
      "top secret",
      {
        algorithm: "HS256",
        issuer: "nodebucket.com",
        subject: employeeData._id.toString()
      }
    );

    return token;
  }
}
