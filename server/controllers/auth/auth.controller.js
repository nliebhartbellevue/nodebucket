/**
 * Title: controllers/auth/auth.controller.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import EmployeeAuthService from "../../services/auth/employees-auth.service";

export default class AuthController {
  constructor() {
    this.employeeAuthService = new EmployeeAuthService();
  }

  async signUp(req, res, next) {
    const employeeToken = await this.employeeAuthService.signUp(req.body);
    return res.json({
      token: employeeToken
    });
  }

  async signIn(req, res, next) {
    const { empid, password } = req.body;
    const accessToken = await this.employeeAuthService.signIn(empid, password);

    res.status(accessToken ? 200 : 401).json({
      ...(accessToken
        ? { token: accessToken }
        : { message: "Authentication Failed!" })
    });
  }
}
