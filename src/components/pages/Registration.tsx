import { useDispatch } from "react-redux";
import UserCredentialsDataType from "../../model/UserCredentialsDataType";
import UserDataType from "../../model/UserDataType";
import { authService, usersService } from "../../config/service-config";
import { authActions } from "../../redux/slices/authSlice";
import RegistrationForm from "../forms/RegistrationForm";
import UserType from "../../model/UserType";
import { useDispatchCode } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {

    const dispatch = useDispatch();
    const dispatchCode = useDispatchCode()
    const navigate = useNavigate()

    async function submitFn(loginData: UserCredentialsDataType, userData: UserType): Promise<void> {

        const successMessage: string = "Registration success"
        let errorMessage: string = ''
        let res: UserDataType | string = ''

        try {
            res = await authService.register(loginData);
            typeof res == 'object' && dispatch(authActions.set(res));
            if (typeof res == 'string') {
                errorMessage = res
            } else {
                const user = await usersService.addUser(userData, res!.uid)
            }

        } catch (error: any) {
            errorMessage = error.message
        }

        dispatchCode(successMessage, errorMessage)
        if (successMessage && typeof res == 'object') {
            navigate('/')
        }
    }

    return (
        <RegistrationForm submitFn={submitFn}></RegistrationForm>
    )
}

export default Registration