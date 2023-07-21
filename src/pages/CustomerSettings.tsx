import { Typography } from "@mui/material"
import AccountInfo from "../components/AccountInfo"
import { usersService } from '../config/service-config'
import UserType from "../model/UserType";
import { useDispatchCode } from "../hooks/hooks";

const CustomerSettings: React.FC = () => {

    const dispatchCode = useDispatchCode()

    const successMessage: string = 'Your personal data was updated'
    let errorMessage: string = ''

    async function submitFn(userData: UserType, uid: string): Promise<void> {

        try {
            const user = await usersService.updateUser(userData, uid)
        } catch (error: any) {
            errorMessage = error.message
        }
        dispatchCode(successMessage, errorMessage)
    }

    return (
        <Typography component={"div"}>
            <AccountInfo submitFn={submitFn}></AccountInfo>
        </Typography >
    )
}

export default CustomerSettings