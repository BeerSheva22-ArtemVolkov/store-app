import { useTheme } from "@emotion/react"
import { Box, Button, Container, CssBaseline, Divider, Grid, MenuItem, Select, Switch, TextField, ThemeProvider } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import ProductType from "../../model/ProductType";
import pages from "../../config/store-pages";
import PageType from "../../model/PagesType";

const formValuesInit: ProductType = {
    name: '',
    price: 0,
    quantity: 0,
    image: { storageRef: '', url: '' },
    description: '',
    rating: { count: 0, rate: 0 },
    deliveryDays: 0,
    categories: []
}

type productProps = {
    product?: ProductType
    submitFn(product: ProductType, image: File | undefined): Promise<void>
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const AddProduct: React.FC<productProps> = ({ product, submitFn }) => {

    const theme = useTheme()

    const [imageUpload, setImageUpload] = useState<File | undefined>();
    const [previewImageURL, setPreviewImageURL] = useState<string>('')
    const [formValues, setFormValues] = useState(formValuesInit)
    const [editMode, setEditMode] = useState<boolean>(true)

    useEffect(() => {
        setFormValues(product || formValuesInit)
        return () => {
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

    const handlerDescription = (event: any) => {
        setFormValues({ ...formValues, description: event.target.value })
    }

    const handlerCategories = (event: any) => {
        console.log(event.target.value);
        const catArr: string[] = event.target.value.split(",")
        const trimmedArr = catArr.map(cat => cat.trim())
        setFormValues({ ...formValues, categories: trimmedArr })
    };

    const switchEditMode = () => {
        setEditMode(!editMode)
    }

    function onReset(event: FormEvent) {
        setFormValues(product || formValuesInit)
        setPreviewImageURL('')
    }

    async function onSubmit(event: any) {
        event.preventDefault();
        await submitFn({
            id: product?.id,
            name: formValues.name,
            price: formValues.price,
            quantity: formValues.quantity,
            image: {
                storageRef: formValues.image.storageRef,
                url: formValues.image.url
            },
            description: formValues.description,
            rating: { count: formValues.rating.count, rate: formValues.rating.rate },
            deliveryDays: formValues.deliveryDays,
            categories: formValues.categories
        },
            imageUpload)
    }

    const menus: JSX.Element[] = []

    function getMenus(pages: PageType[], deep: number, parentValue?: string) {
        pages.forEach(page => {
            const value = parentValue ? `${parentValue}, ${page.categoryName}` : page.categoryName
            menus.push(<MenuItem value={value} key={page.categoryName}>
                {"-".repeat(deep) + page.categoryName}
            </MenuItem>)
            getMenus(page.sub, deep + 5, value)
        })
    }

    getMenus([pages], 0)

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
                            <Grid item xs={6}>
                                <Box>
                                    <label htmlFor="btn-upload" style={{ width: '100%' }}>
                                        <input
                                            id="btn-upload"
                                            name="btn-upload"
                                            style={{ display: 'none' }}
                                            type="file"
                                            onChange={(event) => {
                                                setImageUpload(event.target.files![0])
                                                setPreviewImageURL(URL.createObjectURL(event.target.files![0]));
                                            }}
                                        />
                                        <Button
                                            style={{ width: '100%' }}
                                            className="btn-choose"
                                            variant="outlined"
                                            component="span"
                                            disabled={!editMode}
                                        >
                                            Choose Image
                                        </Button>
                                    </label>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <img src={previewImageURL || formValues.image.url} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                </Box>
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
                            <Grid item xs={12}>
                                <Select
                                    fullWidth
                                    onChange={handlerCategories}
                                    value={formValues.categories.join(', ')}
                                    inputProps={{ readOnly: !editMode }}
                                    MenuProps={MenuProps}
                                >
                                    {menus.map(menu => menu)}
                                </Select>
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