import { Box, Typography } from "@mui/material"
import { Outlet } from "react-router-dom"
import RouteType from "../../model/RouteType"
import AcccountNavigation from "../navigation/AccountNavigation"

const Account: React.FC = () => {
    return (
        <>
            <Typography variant="h3">
                Account Menu
            </Typography>
            <Outlet></Outlet>
        </>
    )
}

export default Account