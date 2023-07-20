import LoginData from "../../model/UserCredentialsDataType";
import UserData from "../../model/UserDataType";

export default interface AuthService {
    login(loginData: LoginData): Promise<UserData | string>
    logout(): Promise<void>
    register(loginData: LoginData): Promise<UserData | string>
    loginByLink(email: string, link: string): Promise<UserData | string>
}