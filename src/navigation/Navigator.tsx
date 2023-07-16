import { AppBar, Box, SvgIconTypeMap, Tab, Tabs, Typography } from "@mui/material"
import RouteType from "../model/RouteType"
import { ReactNode, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, AccountCircle } from '@mui/icons-material'
import Badge from '@mui/material/Badge';
import { useSelector } from "react-redux";
import { useSelectorCart } from "../redux/store";



const Navigator: React.FC<{ routes: RouteType[] }> = ({ routes }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(0);
    const cart = useSelectorCart()
    
    const array = [
        {
            name: 'ShoppingCart',
            icon: <Badge badgeContent={cart.length} color="error" anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}>
                <ShoppingCart />
            </Badge>
        },
        {
            name: 'AccountCircle',
            icon: <AccountCircle />
        }
    ]

    function getIcon(iconName: string): any {
        return array.find(el => el.name === iconName)?.icon
    }

    useEffect(() => {
        let index = routes.findIndex(r => r.to === location.pathname);
        if (index < 0) {
            index = 0;
        }
        navigate(routes[index].to);
        setValue(index);
    }, [routes])

    function onChangeFn(event: any, newValue: number) {
        setValue(newValue);
    }

    function getTabs(): ReactNode {
        // return routes.filter(r => r.type == 'general').map(r => {
        return routes.map(r => <Tab sx={r.icon ? { flexGrow: 0 } : { flexGrow: 1}} component={NavLink} to={r.to} label={r.icon ? '' : r.label} key={r.label} icon={r.icon ? getIcon(r.icon) : undefined} />)
    }

    return <Box mt={10}>
        <AppBar sx={{ backgroundColor: "lightgray" }}>
            <Tabs value={value < routes.length ? value : 0} onChange={onChangeFn}>
                {/* <Tabs> */}
                {getTabs()}
            </Tabs>
        </AppBar>
        <Outlet></Outlet>

    </Box>
}

export default Navigator