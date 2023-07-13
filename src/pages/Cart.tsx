import { Box, Grid, Paper, Typography, styled } from "@mui/material"
import ProductItem from "../components/ProductItem";
import { useSelectorCart } from "../redux/store";
import CartItem from "../components/CartItem";

const Cart: React.FC = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const cart = useSelectorCart()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={2}
            >
                <Grid item container spacing={1} xs={8}>
                    {cart.map(cartItem => {
                        return <Grid item xs={12}>
                            <CartItem cartItem={cartItem} />
                        </Grid>
                    })}
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=8</Item>
                </Grid>
            </Grid >
        </Box>
    )
}

export default Cart