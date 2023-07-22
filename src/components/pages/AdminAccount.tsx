import { Typography } from "@mui/material"
import { Outlet } from "react-router-dom"

const AdminAccount: React.FC = () => {
    return (
        <>
            <Typography component={"div"}>
                AdminAccount menu
            </Typography>
            <Outlet></Outlet>
        </>
    )
}

export default AdminAccount