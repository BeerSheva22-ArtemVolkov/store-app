import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material"
import ProductItem from "../components/ProductItem";
import { useSelectorAuth, useSelectorCart } from "../redux/store";
import CartItem from "../components/CartItem";
import { useDispatch } from "react-redux";
import { ordersService } from "../config/service-config";



const Cart: React.FC = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const cart = useSelectorCart()
    console.log(cart);
    // const dispatch = useDispatch()
    const userData = useSelectorAuth();
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={2}
            >
                <Grid item container spacing={1} xs={8}>
                    {cart.map(cartItem => {
                        console.log('building cart item', cartItem);
                        return <Grid item xs={12}>
                            <CartItem cartItem={cartItem} />
                        </Grid>
                    })}
                </Grid>
                <Grid item xs={4}>
                    <Button
                        fullWidth
                        color="primary"
                        disabled={false}
                        size="large"
                        variant="outlined"
                        onClick={() => {
                            ordersService.addOrder({
                                status: "New",
                                dateStart: new Date(),
                                userEmail: userData!.email,
                                total: cart.reduce((sum, cartItem) => cartItem.price * cartItem.quantity + sum, 0),
                                cart
                            })
                        }}
                    >Оформить заказ</Button>
                    <Box>
                        <Typography component="h1" variant="h5">
                            Итого:
                        </Typography>
                        <Typography component="h1" variant="h4">
                            {cart.reduce((sum, cartItem) => cartItem.price * cartItem.quantity + sum, 0)}₪
                        </Typography>
                    </Box>
                </Grid>
            </Grid >
        </Box>
    )
}

export default Cart