import { ShoppingCart, AccountCircle, Logout, Settings } from "@mui/icons-material"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export function GetIcon(iconName: string): JSX.Element {

    const array = [
        {
            name: 'ShoppingCart',
            icon: <ShoppingCart />
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

    return array.find(el => el.name === iconName)!.icon
}