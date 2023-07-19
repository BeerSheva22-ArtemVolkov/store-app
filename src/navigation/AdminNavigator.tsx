import { AppBar, Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, SvgIconTypeMap, Tab, Tabs, Tooltip, Typography } from "@mui/material"
import RouteType from "../model/RouteType"
import { ReactNode, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, AccountCircle, Logout, Settings } from '@mui/icons-material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Badge from '@mui/material/Badge';
import { useSelectorCart } from "../redux/store";

const AdminNavigator: React.FC<{ routes: RouteType[] }> = ({ routes }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(0);
    const cart = useSelectorCart()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
        },
        {
            name: 'Logout',
            icon: <Logout />
        },
        {
            name: 'Settings',
            icon: <Settings />
        },
        {
            name: 'ShoppingBagIcon',
            icon: <ShoppingBagIcon />
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
        return routes.filter(route => route.type == 'general').map(r => <Tab sx={r.icon ? { flexGrow: 0 } : { flexGrow: 1 }} component={NavLink} to={r.to} label={r.icon ? '' : r.label} key={r.label} icon={r.icon ? getIcon(r.icon) : undefined} />)
    }

    return <Box mt={10}>
        <AppBar sx={{ backgroundColor: "lightgray" }}>
            <Tabs value={value < routes.length ? value : 0} onChange={onChangeFn}>
                {/* <Tabs> */}
                {getTabs()}
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            // mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                // ml: -0.5,
                                // mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {routes.filter(route => route.type == 'account').map(r => {
                        return <MenuItem sx={{margin: 0, p: 0}}>
                            <Tab  component={NavLink} to={r.to} label={r.label} key={r.label} iconPosition="start" icon={r.icon ? getIcon(r.icon) : undefined} />
                        </MenuItem>
                    })}
                </Menu>
            </Tabs>
        </AppBar>
        <Outlet></Outlet>

    </Box>
}

export default AdminNavigator