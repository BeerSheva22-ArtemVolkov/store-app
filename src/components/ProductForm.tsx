import { useTheme } from "@emotion/react"
import { Box, Button, Container, CssBaseline, Divider, Grid, TextField, ThemeProvider, Typography } from "@mui/material"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useDispatchCode } from "../hooks/hooks";
import ProductType from "../model/ProductType";

const formValuesInit = {
    name: '',
    price: 0,
    quantity: 0,
    image: '',
    description: '',
}

type productProps = {
    product?: ProductType
    submitFn(product: ProductType): Promise<ProductType>
}

const AddProduct: React.FC<productProps> = ({ product, submitFn }) => {

    const theme = useTheme()
    console.log(product);

    const [formValues, setFormValues] = useState(formValuesInit)
    const dispatch = useDispatchCode();

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

    const handlerImage = (event: any) => {
        setFormValues({ ...formValues, image: event.target.value })
    }

    const handlerDescription = (event: any) => {
        setFormValues({ ...formValues, description: event.target.value })
    }

    async function onReset(event: FormEvent) {
        setFormValues(product || formValuesInit)
    }

    async function onSubmit(event: any) {
        event.preventDefault();
        let errorMessage = '';
        const successMessage = 'Product added'
        try {
            await submitFn({id: product?.id, name: formValues.name, price: formValues.price, quantity: formValues.quantity, image: formValues.image, description: formValues.description, rating: { count: 0, rate: 0 } })
            // await productsService.addProduct({ name: formValues.name, price: formValues.price, quantity: formValues.quantity, image: formValues.image, description: formValues.description, rating: { count: 0, rate: 0 } })
            // onReset(event)
        }
        catch (error: any) {
            errorMessage = error
        }
        dispatch(errorMessage, successMessage)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: { xs: 8, sm: -4, md: 8 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onReset={onReset} onSubmit={onSubmit} sx={{ mt: 1 }}>
                        <Grid container justifyContent={'center'} spacing={1}>
                            <Grid item xs={12} sm={6} md={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoFocus
                                    value={formValues.name}
                                    onChange={handlerName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="price"
                                    label="Price"
                                    type="number"
                                    id="number"
                                    value={formValues.price}
                                    onChange={handlerPrice}
                                    inputProps={{
                                        min: 1,
                                        max: 1000000
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="quantity"
                                    label="Start quantity"
                                    type="number"
                                    id="quantity"
                                    value={formValues.quantity}
                                    onChange={handlerQuantity}
                                    inputProps={{
                                        min: 1,
                                        max: 1000
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="image"
                                    label="Image"
                                    id="image"
                                    value={formValues.image}
                                    onChange={handlerImage}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    id="description"
                                    value={formValues.description}
                                    onChange={handlerDescription}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                >
                                    {product ? "Update product" : "Add new product"}
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Button
                                    type="reset"
                                    fullWidth
                                    variant="contained"
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider >
    )
}

export default AddProduct