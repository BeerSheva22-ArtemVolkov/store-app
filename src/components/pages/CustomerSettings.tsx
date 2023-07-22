import { Typography } from "@mui/material"
import AccountInfo from "../info/AccountInfo"
import { usersService } from '../../config/service-config'
import UserType from "../../model/UserType";
import { useDispatchCode } from "../../hooks/hooks";

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

    return <>
        <Typography variant="h4">
            Account info
        </Typography >
        <AccountInfo submitFn={submitFn}></AccountInfo>
    </>
}

export default CustomerSettings