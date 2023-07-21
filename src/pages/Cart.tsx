import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Paper, Typography, styled } from "@mui/material"
import ProductItem from "../components/ProductItem";
import { useSelectorAuth, useSelectorCart } from "../redux/store";
import CartItem from "../components/CartItem";
import { useDispatch } from "react-redux";
import { ordersService } from "../config/service-config";
import { useNavigate } from "react-router-dom";
import routesConfig from '../config/routes-config.json'
import { useSelectorUsers } from "../hooks/hooks";
import UserType from "../model/UserType";
import { useEffect, useState } from "react";
import { cartActions } from "../redux/slices/cartSlice";

const Cart: React.FC = () => {

    const dispatch = useDispatch()
    const cart = useSelectorCart()
    const userData = useSelectorAuth();
    const navigate = useNavigate()
    const users = useSelectorUsers()
    const [currentUser, setCurrentuser] = useState<UserType | undefined>(users.find(user => user.email == userData?.email))
    const [submitDialog, setSubmitDialog] = useState<boolean>(false)

    const closeSubmitDialog = () => {
        setSubmitDialog(false)
    }

    const openSubmitDialog = () => {
        setSubmitDialog(true)
    }

    useEffect(() => {
        setCurrentuser(users.find(user => user.email == userData?.email))
    }, [userData, users])

    function checkAddress(): boolean {
        let res = false
        if (currentUser) {
            res = Boolean(currentUser.address.city) && Boolean(currentUser.address.flatNumber) && Boolean(currentUser.address.street) && Boolean(currentUser.address.streetNumber)
        }
        return res
    }

    async function makeOrder() {
        try {
            await ordersService.addOrder({
                status: "New",
                dateStart: new Date(),
                userEmail: userData!.email,
                total: cart.reduce((sum, cartItem) => cartItem.price * cartItem.quantity + sum, 0),
                cart
            })
            dispatch(cartActions.clearCart())
        } catch (error: any) {
            console.log(error.message);
        }
        closeSubmitDialog()
    }

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
                    {userData ?
                        <Box>
                            {!checkAddress() && <Alert severity="error" icon={false}>You didn't fill in the shipping information</Alert>}
                            < Button
                                fullWidth
                                color="primary"
                                disabled={cart.length == 0 || !checkAddress()}
                                size="large"
                                variant="outlined"
                                onClick={openSubmitDialog}
                            >Create order</Button>
                        </Box>
                        :
                        <Box>
                            <Alert severity="error" icon={false}>Yuo are not authorized</Alert>


                            <Button
                                fullWidth
                                color="primary"
                                size="large"
                                variant="outlined"
                                onClick={() => navigate(routesConfig.noauthenticated.find(route => route.label == 'Registration')!.to)}
                            >Sign up</Button>
                            <Divider sx={{ width: '100%', fontWeight: 'bold' }}>Или</Divider>
                            <Button
                                fullWidth
                                color="primary"
                                size="large"
                                variant="outlined"
                                onClick={() => navigate(routesConfig.noauthenticated.find(route => route.label == 'Sign In')!.to)}
                            >Sign in</Button>
                        </Box>}
                    <Box>
                        <Typography component="h1" variant="h5">
                            For pay:
                        </Typography>
                        <Typography component="h1" variant="h4">
                            {cart.reduce((sum, cartItem) => cartItem.price * cartItem.quantity + sum, 0)}₪
                        </Typography>
                    </Box>
                </Grid>
            </Grid >
            <Dialog open={submitDialog} onClose={closeSubmitDialog} fullWidth maxWidth={"xs"}>
                <DialogTitle>Submit order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Submit order?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeSubmitDialog}>
                        Close
                    </Button>
                    <Button onClick={makeOrder} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >

    )
}

export default Cart