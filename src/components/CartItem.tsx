import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import ProductType from '../model/ProductType'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelectorCart } from '../redux/store';
import { cartActions } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelectorProducts } from '../hooks/hooks';

type CartItemProps = {
    cartItem: ProductType
}

const cardStyle = {
    // display: 'block',
    // transitionDuration: '0.3s',
    height: '20vw'
}



const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {

    const theme = useTheme()
    const isPortrait = useMediaQuery(theme.breakpoints.down('md'));
    const cart = useSelectorCart()
    const dispatch = useDispatch()
    const products: ProductType[] = useSelectorProducts();

    // console.log(cart, cartItem);

    const itemCountStart: number = cart.find(item => item.id === cartItem.id)!.quantity
    console.log(itemCountStart);

    const [itemCount, setItemCount] = useState<number>(itemCountStart)

    const incrementItemCart = () => {
        dispatch(cartActions.incrementQuantity(cartItem.id))
        setItemCount(itemCount + 1)
    }

    const decrementItemCart = () => {
        dispatch(cartActions.decrementQuantity(cartItem.id))
        setItemCount(itemCount - 1)
    }

    const deleteItemCart = () => {
        console.log('deleting cart item');
        dispatch(cartActions.removeFromCart(cartItem.id))
    }

    const setItemCartCount = (count: number) => {
        dispatch(cartActions.setQuantity({ productItem: cartItem, count }))
    }

    function onChangeFn(event: any) {
        const count: number = event.target.value as number
        setItemCount(count)
        setItemCartCount(count)
    }



    return <Card sx={{ maxWidth: '100%', boxShadow: 'lg', }} >
        <Grid container spacing={1}>
            <Grid xs={4}>
                <CardMedia component='img' image={cartItem.image} sx={{ height: '100%', width: '100%' }} />
            </Grid>
            <Grid xs={8}>
                <CardContent>
                    <Typography variant='h3'>{cartItem.name}</Typography>
                    <Box>

                        <Typography variant='h6'>x{itemCount} {cartItem.price * itemCount}₪</Typography>
                    </Box>
                    <Box>
                        <Box>
                            <ButtonGroup fullWidth>
                                <Button variant="contained" onClick={decrementItemCart} >
                                    -
                                </Button>
                                <TextField
                                    type='tel'
                                    onChange={onChangeFn}
                                    value={itemCount}
                                    variant='standard'
                                    inputProps={{
                                        min: 1,
                                        max: products.find(product => product.id == cartItem.id)?.quantity || 100,
                                        style: { textAlign: 'center', fontSize: 20 }
                                    }} />
                                <Button variant="contained" onClick={incrementItemCart} >
                                    +
                                </Button>
                            </ButtonGroup>

                            <Button variant="contained" color='error' onClick={deleteItemCart} endIcon={<DeleteIcon />} fullWidth />
                        </Box>
                    </Box>
                </CardContent>
            </Grid>
        </Grid>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>


        </Box>
    </Card >
}

export default CartItem