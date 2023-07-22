import { Menu, MenuItem, Tab } from "@mui/material"
import { NavLink } from "react-router-dom"
import RouteType from "../../model/RouteType"
import { GetIcon } from "../../config/icons"

type AccountNavigationProps = {
    routes: RouteType[]
    anchorEl?: HTMLElement | null
    handleClose?: () => void
}

const AcccountNavigation: React.FC<AccountNavigationProps> = ({ routes, anchorEl, handleClose }) => {
    return <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={true}
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
                <Tab component={NavLink} to={r.to} label={r.label} key={r.label} iconPosition="start" icon={r.icon ? GetIcon(r.icon) : undefined} />
            </MenuItem>
        })}
    </Menu>
}

export default AcccountNavigation