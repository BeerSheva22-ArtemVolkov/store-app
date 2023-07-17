import { Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import UserCredentialsDataType from "../model/UserCredentialsDataType";
import UserDataType from "../model/UserDataType";
import InputResultType from "../model/InputResultType";
import { authService, usersService } from "../config/service-config";
import { authActions } from "../redux/slices/authSlice";
import SignInForm from "../forms/SignInForm";
import { useSelectorUsers } from "../hooks/hooks";

const SignIn: React.FC = () => {

    const dispatch = useDispatch();
    const users = useSelectorUsers()

    async function submitFn(loginData: UserCredentialsDataType): Promise<InputResultType> {
        let inputResult: InputResultType = {
            status: 'error',
            message: "Server unavailable, repeat later on"
        }
        try {
            const res: UserDataType | string = await authService.login(loginData);
            typeof res == 'object' && dispatch(authActions.set(res));
            if (typeof res == "object" && res?.role == 'user' && users.findIndex(user => user.email == res.email) == -1) {
                usersService.addUser({ email: res.email, nickname: '', firstName: '', lastName: '', address: { city: '', street: '', flatNumber: 0, streetNumber: 0 } }, res.uid)
            }
            console.log(res);
            
            inputResult = {
                status: res ? 'success' : 'error',
                message: res ? 'Link send to your email' : 'Incorrect Credentials'
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