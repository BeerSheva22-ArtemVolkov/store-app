import { Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import UserCredentialsDataType from "../model/UserCredentialsDataType";
import UserDataType from "../model/UserDataType";
import InputResultType from "../model/InputResultType";
import { authService } from "../config/service-config";
import { authActions } from "../redux/slices/authSlice";
import SignInForm from "../forms/SignInForm";

const SignIn: React.FC = () => {

    const dispatch = useDispatch();

    async function submitFn(loginData: UserCredentialsDataType): Promise<InputResultType> {
        let inputResult: InputResultType = {
            status: 'error',
            message: "Server unavailable, repeat later on"
        }
        try {
            const res: UserDataType | string = await authService.login(loginData);
            res && dispatch(authActions.set(res));
            inputResult = {
                status: res ? 'success' : 'error',
                message: res ? '' : 'Incorrect Credentials'
            }

        } catch (error) {
            console.log(error);
        }
        console.log(inputResult);
        
        return inputResult;
    }

    return (
        <SignInForm submitFn={submitFn}></SignInForm>
    )
}

export default SignIn