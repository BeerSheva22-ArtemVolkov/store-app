import { Alert, Box, Button, Divider, Grid, Paper, Typography, styled } from "@mui/material"
import ProductItem from "../components/ProductItem";
import { useSelectorAuth, useSelectorCart } from "../redux/store";
import CartItem from "../components/CartItem";
import { useDispatch } from "react-redux";
import { ordersService } from "../config/service-config";
import { useNavigate } from "react-router-dom";
import routesConfig from '../config/routes-config.json'

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
    const navigate = useNavigate()

    async function makeOrder() {
        await ordersService.addOrder({
            status: "New",
            dateStart: new Date(),
            userEmail: userData!.email,
            total: cart.reduce((sum, cartItem) => cartItem.price * cartItem.quantity + sum, 0),
            cart
        })
    }

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
                    {userData ? <Button
                        fullWidth
                        color="primary"
                        disabled={cart.length == 0}
                        size="large"
                        variant="outlined"
                        onClick={makeOrder}
                    >Оформить заказ</Button>
                        :
                        <Box>
                            <Alert severity="error" icon={false}>Вы не авторизованы</Alert>
                            <Button
                                fullWidth
                                color="primary"
                                size="large"
                                variant="outlined"
                                onClick={() => navigate(routesConfig.noauthenticated.find(route => route.label == 'Registration')!.to)}
                            >Зарегистрируйтесь</Button>
                            <Divider sx={{ width: '100%', fontWeight: 'bold' }}>Или</Divider>
                            <Button
                                fullWidth
                                color="primary"
                                size="large"
                                variant="outlined"
                                onClick={() => navigate(routesConfig.noauthenticated.find(route => route.label == 'Sign In')!.to)}
                            >Войдите в аккаунт</Button>
                        </Box>}
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