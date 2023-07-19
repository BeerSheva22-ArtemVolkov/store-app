import { useTheme } from "@emotion/react"
import { Box, Button, Container, CssBaseline, Divider, Grid, Slider, Switch, TextField, ThemeProvider, Typography } from "@mui/material"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useDispatchCode } from "../hooks/hooks";
import ProductType from "../model/ProductType";

const formValuesInit = {
    name: '',
    price: 0,
    quantity: 0,
    image: '',
    description: '',
    rating: { count: 0, rate: 0 },
    deliveryDays: 0
}

type productProps = {
    product?: ProductType
    submitFn(product: ProductType): Promise<ProductType>
}

const AddProduct: React.FC<productProps> = ({ product, submitFn }) => {

    const theme = useTheme()

    const [formValues, setFormValues] = useState(formValuesInit)
    const dispatch = useDispatchCode();
    const [editMode, setEditMode] = useState<boolean>(false)

    useEffect(() => {
        setFormValues(product || formValuesInit)
        return () => {
            console.log('unmounting');
            setFormValues(formValuesInit)
        }
    }, [product])

    const handlerName = (event: any) => {
        setFormValues({ ...formValues, name: event.target.value })
    }

    const handlerPrice = (event: any) => {
        setFormValues({ ...formValues, price: event.target.value })
    }

    const handlerQuantity = (event: any) => {
        setFormValues({ ...formValues, quantity: event.target.value })
    }

    const handleDelivery = (event: any) => {
        setFormValues({ ...formValues, deliveryDays: event.target.value })
    }

    const handlerImage = (event: any) => {
        setFormValues({ ...formValues, image: event.target.value })
    }

    const handlerDescription = (event: any) => {
        setFormValues({ ...formValues, description: event.target.value })
    }

    const switchEditMode = () => {
        setEditMode(!editMode)
    }

    async function onReset(event: FormEvent) {
        setFormValues(product || formValuesInit)
    }

    async function onSubmit(event: any) {
        event.preventDefault();
        let errorMessage = '';
        const successMessage = 'Product added'
        try {
            await submitFn({
                id: product?.id,
                name: formValues.name,
                price: formValues.price,
                quantity: formValues.quantity,
                image: formValues.image,
                description: formValues.description,
                rating: { count: formValues.rating.count, rate: formValues.rating.rate },
                deliveryDays: formValues.deliveryDays
            })
        }
        catch (error: any) {
            errorMessage = error
        }
        dispatch(errorMessage, successMessage)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {product && <Box>
                    <Switch
                        checked={editMode}
                        onChange={switchEditMode}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    Enable editing
                </Box>}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: { xs: 1, sm: 1, md: 1 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onReset={onReset} onSubmit={onSubmit} sx={{ mt: 1 }}>
                        <Grid container justifyContent={'center'} spacing={1}>
                            <Grid item xs={8} sm={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoFocus
                                    value={formValues.name}
                                    onChange={handlerName}
                                    InputProps={{ readOnly: !editMode }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    fullWidth
                                    name="price"
                                    label="Price"
                                    type="tel"
                                    id="number"
                                    value={formValues.price}
                                    onChange={handlerPrice}
                                    inputProps={{
                                        readOnly: !editMode,
                                        min: 1,
                                        max: 1000000
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    name="quantity"
                                    label="Start quantity"
                                    type="tel"
                                    id="quantity"
                                    value={formValues.quantity}
                                    onChange={handlerQuantity}
                                    inputProps={{
                                        readOnly: !editMode,
                                        min: 1,
                                        max: 1000
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    name="delivery"
                                    label="Delivery days"
                                    type="tel"
                                    id="delivery"
                                    value={formValues.deliveryDays}
                                    onChange={handleDelivery}
                                    inputProps={{
                                        readOnly: !editMode,
                                        min: 0,
                                        max: 90
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="image"
                                    label="Image"
                                    id="image"
                                    value={formValues.image}
                                    onChange={handlerImage}
                                    InputProps={{ readOnly: !editMode }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    id="description"
                                    multiline
                                    value={formValues.description}
                                    onChange={handlerDescription}
                                    InputProps={{ readOnly: !editMode }}
                                />
                            </Grid>
                            {(editMode || !product) && <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                >
                                    {product ? "Update product" : "Add new product"}
                                </Button>
                            </Grid>}
                            {(editMode || !product) && <Grid item xs={12}>
                                <Button
                                    type="reset"
                                    fullWidth
                                    variant="contained"
                                >
                                    Reset
                                </Button>
                            </Grid>}
                        </Grid>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider >
    )
}

export default AddProduct