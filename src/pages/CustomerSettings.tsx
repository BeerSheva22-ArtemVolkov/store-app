import { Typography } from "@mui/material"
import AccountInfo from "../components/AccountInfo"
import { authService, usersService } from '../config/service-config'
import { useSelectorAuth } from "../redux/store";
import UserDataType from "../model/UserDataType";
import UserType from "../model/UserType";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserCredentialsDataType from "../model/UserCredentialsDataType";
import InputResultType from "../model/InputResultType";
import { authActions } from "../redux/slices/authSlice";
import { useSelectorUsers } from "../hooks/hooks";

const CustomerSettings: React.FC = () => {

    // const users = useSelectorUsers()
    // const userData = useSelectorAuth();
    // const [currentUser, setCurrentuser] = useState<UserType | undefined>(users.find(user => user.email == userData?.email))

    // useEffect(() => {        
    //     setCurrentuser(users.find(user => user.email == userData?.email))
    // }, [userData, users])

    async function submitFn(userData: UserType, uid: string): Promise<InputResultType> {
        let inputResult: InputResultType = {
            status: 'error',
            message: "Server unavailable, repeat later on"
        }
        try {
            const user = await usersService.updateUser(userData, uid)
            inputResult = { status: 'success', message: 'User address updated' }

        } catch (error: any) {
            inputResult = { status: 'error', message: error.message }
        }

        return inputResult;
    }

    return (
        <Typography component={"div"}>
            <AccountInfo submitFn={submitFn}></AccountInfo>
        </Typography >
    )
}

export default CustomerSettings