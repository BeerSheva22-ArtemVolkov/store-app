import AuthService from "../service/auth/AuthService";
import AuthServiceFire from "../service/auth/AuthServiceFire";
// import EmployeesService from "../service/crud/EmployeesService";
// import EmployeesServiceFire from "../service/crud/EmployeesServiceFire";

export const authService: AuthService = new AuthServiceFire();
// export const employeesService: EmployeesService = new EmployeesServiceFire();