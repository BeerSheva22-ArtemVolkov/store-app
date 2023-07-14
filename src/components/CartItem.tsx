import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
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



    return <Card sx={{ maxWidth: '100%', boxShadow: 'lg' }}>
        <CardMedia component='img' image={cartItem.image} sx={{ width: 151 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent>
                <Typography variant='body1'>{cartItem.name}</Typography>
                <Typography variant='subtitle1'>x{itemCount} {cartItem.price * itemCount}₪</Typography>
                <Typography variant="body2">{cartItem.description}</Typography>
                {/* <Link
                href="#product-card"
                fontWeight="xl"
                color="neutral"
                textColor="text.primary"
                overlay
                endDecorator={<ArrowOutwardIcon />}
            >
                Super Rockez A400
            </Link>  */}
                <Box>
                    <Box>
                        <Button variant="contained" onClick={decrementItemCart} >
                            -
                        </Button>
                        <TextField
                            type='number'
                            onChange={onChangeFn}
                            value={itemCount}
                            variant='standard'
                            inputProps={{
                                min: 1,
                                max: products.find(product => product.id == cartItem.id)?.quantity || 100
                            }} />
                        <Button variant="contained" onClick={incrementItemCart} >
                            +
                        </Button>

                        <Button variant="contained" onClick={deleteItemCart} endIcon={<DeleteIcon />} />
                    </Box>

                </Box>
            </CardContent>

        </Box>
    </Card >
}

export default CartItem