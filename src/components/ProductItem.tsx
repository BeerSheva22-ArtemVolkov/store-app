import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Rating, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
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
        <Box>
            <CardMedia component='img' image={productItem.image} sx={{ height: '250px' }} />
        </Box>
        <CardContent style={{ padding: '.5rem' }}>
            <Typography variant='body1'>{productItem.name}</Typography>
            <Typography variant='subtitle1'>{productItem.price}₪</Typography>
            <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}>
                <Rating name="size-small" defaultValue={productItem.rating.rate} size="small" readOnly />
                <Typography sx={{ fontSize: 11 }}>{`${productItem.rating.rate} / ${productItem.rating.count}`}</Typography>
            </Box>
        </CardContent>
        <CardActions>
            <Box>
                {itemCount ?
                    <Box>
                        <ButtonGroup>
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
                                    max: productItem.quantity,
                                    style: { textAlign: 'center', fontSize: 20 }
                                }} />
                            <Button variant="contained" onClick={incrementItemCart} >
                                +
                            </Button>
                        </ButtonGroup>
                        <Button variant="contained" color='error' onClick={nullItemCart} endIcon={<DeleteIcon />} fullWidth />
                    </Box>
                    :
                    <Box>
                        <Button variant="contained" onClick={addItemToCart} endIcon={<AddShoppingCartIcon />} fullWidth>
                            to cart
                        </Button>
                    </Box>
                }
            </Box>
        </CardActions>
    </Card >
}

export default ProductItem