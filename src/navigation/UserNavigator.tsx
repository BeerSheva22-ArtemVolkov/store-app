import { AppBar, Avatar, Box, Button, CssBaseline, Divider, Drawer, Icon, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, SvgIconTypeMap, Tab, Tabs, Toolbar, Tooltip, Typography, alpha, styled } from "@mui/material"
import RouteType from "../model/RouteType"
import { ReactNode, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, AccountCircle, Logout, PersonAdd, Settings } from '@mui/icons-material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Badge from '@mui/material/Badge';
import { useSelector } from "react-redux";
import { useSelectorCart } from "../redux/store";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PageType from "../model/PagesType";
import pages from "../config/store-pages";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const UserNavigator: React.FC<{ routes: RouteType[] }> = ({ routes }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(0);
    const cart = useSelectorCart()

    const [catalogHistory, setCatalogHistory] = useState<PageType[]>([])
    const [catalog, setCatalog] = useState(getCatalog(pages))

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [drawerOpened, setDrawerOpened] = useState<boolean>(false)

    const toggleDrawerOpened = () => {
        setDrawerOpened(!drawerOpened)
    }

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

    // useEffect(() => {
    //     let index = routes.findIndex(r => r.to === location.pathname);
    //     if (index < 0) {
    //         index = 0;
    //     }
    //     navigate(routes[index].to);
    //     setValue(index);
    // }, [routes])

    function onChangeFn(event: any, newValue: number) {
        setValue(newValue);
    }

    function getTabs(): ReactNode {
        return routes.filter(route => route.type == 'general').map(r => <Tab component={NavLink} to={r.to} label={r.icon ? '' : r.label} key={r.label} icon={r.icon ? getIcon(r.icon) : undefined} />)
    }

    function getCartTab(): ReactNode {
        return routes.filter(route => route.type == 'cart').map(r => <Tab component={NavLink} to={r.to} label={r.icon ? '' : r.label} key={r.label} icon={r.icon ? getIcon(r.icon) : undefined} />)
    }

    function getCatalog(pages: PageType) {
        // return routes.filter(route => route.type == 'store').map(r => <ListItemButton><Tab component={NavLink} to={r.to} label={r.icon ? '' : r.label} key={r.label} icon={r.icon ? getIcon(r.icon) : undefined} /></ListItemButton>)
        return <>
            {
                pages.sub.length ?
                    <>
                        {
                            catalogHistory.length > 0 && <ListItemButton onClick={() => {
                                setCatalog(getCatalog(catalogHistory[catalogHistory.length - 1]))
                                catalogHistory.pop()
                                setCatalogHistory(catalogHistory)
                            }}>Назад</ListItemButton>}
                        <ListItemButton><Tab component={NavLink} to={pages.to} label={`Показать все из ${pages.name}`} key={pages.name} /></ListItemButton>
                        {pages.sub.map(subpage => {
                            return subpage.sub.length ?
                                <ListItemButton onClick={() => {
                                    catalogHistory.push(pages)
                                    setCatalogHistory(catalogHistory)
                                    console.log(catalogHistory);
                                    setCatalog(getCatalog(subpage))
                                }}>
                                    <ListItemText primary={subpage.name} />
                                    <ListItemIcon>
                                        <ArrowForwardIosIcon />
                                    </ListItemIcon>
                                </ListItemButton>
                                :
                                <ListItemButton>
                                    <Tab component={NavLink} to={subpage.to} label={subpage.name} key={subpage.name} />
                                </ListItemButton>
                        })}

                    </>
                    :
                    <ListItemButton>
                        <Tab component={NavLink} to={pages.to} label={pages.name} key={pages.name} />
                    </ListItemButton>
            }
        </>
    }

    return <Box>
        {/* <AppBar sx={{ backgroundColor: "gray" }}>
            <Tabs value={value < routes.length ? value : 0} onChange={onChangeFn} centered={false}>
                {getTabs()}
                <Box style={{ position: 'fixed', right: 16 }}>
                    {getCartTab()}
                    <Tooltip title="Account settings" >
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
                </Box>

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
                        return <MenuItem sx={{ margin: 0, p: 0 }}>
                            <Tab component={NavLink} to={r.to} label={r.label} key={r.label} iconPosition="start" icon={r.icon ? getIcon(r.icon) : undefined} />
                        </MenuItem>
                    })}
                </Menu>
            </Tabs>
        </AppBar> */}

        <AppBar position="static">
            <Toolbar>
                <Button variant="contained" startIcon={<MenuIcon />} color="secondary" onClick={toggleDrawerOpened}>
                    Каталог
                </Button>
                {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton> */}
                <Box ml={3}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Art Shop
                    </Typography>
                </Box>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {/* <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton> */}
                    {getCartTab()}
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
                </Box>
            </Toolbar>
            <Drawer open={drawerOpened} onClose={toggleDrawerOpened} anchor="left" style={{ width: '100%' }}>
                <Box sx={{ width: '250px' }}>
                    <List>
                        {catalog}
                    </List>
                </Box>
            </Drawer>
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
                    return <MenuItem sx={{ margin: 0, p: 0 }}>
                        <Tab component={NavLink} to={r.to} label={r.label} key={r.label} iconPosition="start" icon={r.icon ? getIcon(r.icon) : undefined} />
                    </MenuItem>
                })}
            </Menu>
        </AppBar>


        <Outlet></Outlet>
    </Box>
}

export default UserNavigator