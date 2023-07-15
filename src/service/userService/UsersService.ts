import { Observable } from "rxjs";
import UserType from "../../model/UserType";

export default interface UsersService {
    addUser(product: UserType, uid: string): Promise<UserType>;
    getUsers(): Observable<UserType[] | string>;
    getUser(uid: string): Promise<UserType | string>
    updateUser(user: UserType, uid: string): Promise<UserType>;
}