import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import ProductType from '../model/ProductType'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelectorCart } from '../redux/store';
import { cartActions } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

type ProductItemProps = {
    productItem: ProductType
}

const cardStyle = {
    // display: 'block',
    // transitionDuration: '0.3s',
    height: '20vw'
}



const ProductItem: React.FC<ProductItemProps> = ({ productItem }) => {

    const theme = useTheme()
    const isPortrait = useMediaQuery(theme.breakpoints.down('md'));
    const cart = useSelectorCart()
    const dispatch = useDispatch()

    console.log(cart);

    const itemCountStart: number = cart.find(item => item.id === productItem.id)?.quantity || 0
    const [itemCount, setItemCount] = useState<number>(itemCountStart)

    const addItemToCart = () => {
        dispatch(cartActions.addToCart(productItem))
        setItemCount(1)
    }

    const incrementItemCart = () => {
        dispatch(cartActions.incrementQuantity(productItem.id))
        setItemCount(itemCount + 1)
    }

    const decrementItemCart = () => {
        dispatch(cartActions.decrementQuantity(productItem.id))
        setItemCount(itemCount - 1)
    }

    const nullItemCart = () => {
        setItemCount(0)
        setItemCartCount(0)
    }

    const setItemCartCount = (count: number) => {
        dispatch(cartActions.setQuantity({ productItem, count }))
    }

    function onChangeFn(event: any) {
        const count: number = event.target.value as number
        setItemCount(count)
        setItemCartCount(count)
    }

    return <Card sx={{ maxWidth: '100%', boxShadow: 'lg' }}>
        <CardMedia component='img' image={productItem.image} />
        <CardContent>
            <Typography variant='body1'>{productItem.name}</Typography>
            <Typography variant='subtitle1'>{productItem.price}₪</Typography>
            <Typography variant="body2">{productItem.description}</Typography>
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
                {itemCount ?
                    <Box>
                        <Button variant="contained" onClick={incrementItemCart} >
                            +
                        </Button>
                        <TextField
                            type='number'
                            onChange={onChangeFn}
                            value={itemCount}
                            variant='standard'
                            inputProps={{
                                min: 1,
                                max: productItem.quantity
                            }} />
                        <Button variant="contained" onClick={decrementItemCart} >
                            -
                        </Button>
                        <Button variant="contained" onClick={nullItemCart} endIcon={<DeleteIcon />} />
                    </Box>
                    :
                    <Button variant="contained" onClick={addItemToCart} endIcon={<AddShoppingCartIcon />}>
                        Add to cart
                    </Button>
                }
            </Box>
        </CardContent>
    </Card >
}

export default ProductItem