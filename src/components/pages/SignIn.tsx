import { Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import UserCredentialsDataType from "../../model/UserCredentialsDataType";
import UserDataType from "../../model/UserDataType";
import InputResultType from "../../model/InputResultType";
import { authService, usersService } from "../../config/service-config";
import { authActions } from "../../redux/slices/authSlice";
import SignInForm from "../forms/SignInForm";
import { useDispatchCode, useSelectorUsers } from "../../hooks/hooks";
import { codeActions } from "../../redux/slices/codeSlice";
import { useSelectorCode } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const dispatchCode = useDispatchCode()
    const users = useSelectorUsers()

    async function submitFn(loginData: UserCredentialsDataType): Promise<void> {

        let successMessage: string = ''
        let errorMessage: string = ''
        let res: UserDataType | string = ''

        try {
            res = await authService.login(loginData);
            typeof res == 'object' && dispatch(authActions.set(res));
            if (typeof res == "object" && res?.role == 'user' && users.findIndex(user => typeof res != 'string' && user.email == res!.email) == -1) {
                usersService.addUser({ email: res.email, nickname: '', firstName: '', lastName: '', address: { city: '', street: '', flatNumber: 0, streetNumber: 0 } }, res.uid)
            }

            if (typeof res == 'string') {
                if (res.includes('error')) {
                    errorMessage = res.replace('error: ', '')
                } else {
                    successMessage = res
                }
            } else {
                successMessage = 'Welcome back'
            }
        } catch (error: any) {
            errorMessage = error.message;
        }
        dispatchCode(successMessage, errorMessage)
        if (successMessage && typeof res == 'object') {
            navigate('/')
        }
    }

    return (
        <SignInForm submitFn={submitFn}></SignInForm>
    )
}

export default SignIn