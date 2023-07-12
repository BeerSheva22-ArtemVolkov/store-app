import { Typography } from "@mui/material"
import { Outlet } from "react-router-dom"

const Account: React.FC = () => {
    return (
        <>
            <Typography component={"div"}>
                Account menu
            </Typography>
            <Outlet></Outlet>
        </>
    )
}

export default Account