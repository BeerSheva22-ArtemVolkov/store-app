import { useDispatch } from "react-redux";
import UserCredentialsDataType from "../model/UserCredentialsDataType";
import UserDataType from "../model/UserDataType";
import InputResultType from "../model/InputResultType";
import { authService } from "../config/service-config";
import { authActions } from "../redux/slices/authSlice";
import RegistrationForm from "../forms/RegistrationForm";


const Registration: React.FC = () => {

    const dispatch = useDispatch();

    async function submitFn(loginData: UserCredentialsDataType): Promise<InputResultType> {
        let inputResult: InputResultType = {
            status: 'error',
            message: "Server unavailable, repeat later on"
        }
        try {
            const res: UserDataType | string = await authService.register(loginData);
            if (typeof res == 'string') {
                inputResult = { status: 'error', message: res }
            } else {
                res && dispatch(authActions.set(res));
                inputResult = { status: 'success', message: 'Registration success' }
            }

        } catch (error) {
            
        }

        return inputResult;
    }

    return (
        <RegistrationForm submitFn={submitFn}></RegistrationForm>
    )
}

export default Registration