import { useDispatch } from "react-redux";
import UserCredentialsDataType from "../model/UserCredentialsDataType";
import UserDataType from "../model/UserDataType";
import InputResultType from "../model/InputResultType";
import { authService, usersService } from "../config/service-config";
import { authActions } from "../redux/slices/authSlice";
import RegistrationForm from "../forms/RegistrationForm";
import UserType from "../model/UserType";


const Registration: React.FC = () => {

    const dispatch = useDispatch();

    async function submitFn(loginData: UserCredentialsDataType, userData: UserType): Promise<InputResultType> {
        let inputResult: InputResultType = {
            status: 'error',
            message: "Server unavailable, repeat later on"
        }
        try {
            const registeredUser: UserDataType | string = await authService.register(loginData);
            if (typeof registeredUser == 'string') {
                inputResult = { status: 'error', message: registeredUser }
            } else {
                registeredUser && dispatch(authActions.set(registeredUser));
                const user = await usersService.addUser(userData, registeredUser!.uid)
                inputResult = { status: 'success', message: 'Registration success' }
            }

        } catch (error: any) {
            inputResult = { status: 'error', message: error.message }
        }

        return inputResult;
    }

    return (
        <RegistrationForm submitFn={submitFn}></RegistrationForm>
    )
}

export default Registration