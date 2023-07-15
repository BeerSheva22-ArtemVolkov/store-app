import { Typography } from "@mui/material"
import AccountInfo from "../components/AccountInfo"
import { usersService } from '../config/service-config'
import { useSelectorAuth } from "../redux/store";
import UserDataType from "../model/UserDataType";
import UserType from "../model/UserType";
import { useEffect, useState } from "react";

const CustomerSettings: React.FC = () => {






    return (
        <Typography component={"div"}>
            <AccountInfo></AccountInfo>
        </Typography >
    )
}

export default CustomerSettings