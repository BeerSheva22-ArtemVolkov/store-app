import { Box, Button, ButtonGroup, Chip, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Radio, RadioGroup, Rating, Select, SelectChangeEvent, Stack, TextField, Typography, styled, useTheme } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ProductType from "../model/ProductType";
import { Subscription, min } from "rxjs";
import { useSelectorProducts } from "../hooks/hooks";
import ProductItem from "../components/ProductItem";
import StoreTable from "../components/StoreTable";
import Slider from '@mui/material/Slider';
import StarIcon from '@mui/icons-material/Star';

const MIN_PRICE = 0
const MAX_PRICE = 10000

const ratingsArray = [
    {
        name: 'f3',
        rating: 3
    },
    {
        name: 'f4',
        rating: 4
    },
    {
        name: 'none',
        rating: 0
    }
]

const deliveryArray = [
    {
        name: 'today',
        deliveryDays: 0
    },
    {
        name: 'todayOrTomorrow',
        deliveryDays: 1
    },
    {
        name: 'lessWeek',
        deliveryDays: 7
    },
    {
        name: 'none',
        deliveryDays: 100
    }
]

const sortType = [
    {
        type: 'none',
        name: 'From newwest'
    },
    {
        type: 'priceAscending',
        name: 'Price ascending'
    },
    {
        type: 'priceDescending',
        name: 'Price descending'
    },
    {
        type: 'ratingAscending',
        name: 'Rating ascending'
    },
    {
        type: 'ratingDescending',
        name: 'Rating descending'
    }
]

const Store: React.FC = () => {

    const products: ProductType[] = useSelectorProducts();
    console.log('products init', products);
    
    const [productsFiltered, setProductsFiltered] = useState<ProductType[]>(products)
    const [priceFiltered, setPriceFiltered] = useState<number[]>([MIN_PRICE, MAX_PRICE]);
    const [ratingFiltered, setRatingFiltered] = useState('none')
    const [deliveryFiltered, serDeliveryFiltered] = useState('none')
    const [sortingType, setSortingType] = useState('none')

    const priceChange = (event: Event, newValue: number | number[]) => {
        setPriceFiltered(newValue as number[]);
    };

    const ratingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRatingFiltered((event.target as HTMLInputElement).value);
    };

    const deliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        serDeliveryFiltered((event.target as HTMLInputElement).value);
    };

    const sortChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        
        setSortingType(event.target.value as string);
    };

    useEffect(() => {
        setProductsFiltered(products
            .filter(product => product.price <= priceFiltered[1] && product.price >= priceFiltered[0])
            .filter(product => product.rating.rate >= ratingsArray.find(val => val.name == ratingFiltered)!.rating)
            .filter(product => product.deliveryDays <= deliveryArray.find(val => val.name == deliveryFiltered)!.deliveryDays)
        )
    }, [products, priceFiltered, ratingFiltered, deliveryFiltered])

    useEffect(() => {
        console.log('sorting...');
        
        let productsSort: ProductType[] = []
        switch (sortingType) {
            case 'priceAscending':                
                productsSort = productsFiltered.sort((p1, p2) => p2.price - p1.price)
                break
            case 'priceDescending':
                productsSort = productsFiltered.sort((p1, p2) => p1.price - p2.price)
                break
            case 'ratingAscending':
                productsSort = productsFiltered.sort((p1, p2) => p2.rating.rate - p1.rating.rate)
                break
            case 'ratingDescending':
                productsSort = productsFiltered.sort((p1, p2) => p1.rating.rate - p2.rating.rate)
                break
            default:
                productsSort = products
        }        
        setProductsFiltered(productsSort)
    }, [sortingType])

    return (
        <>
            <Grid container paddingRight={'5vw'} paddingLeft={'5vw'} spacing={1}>
                <Grid xs={6} sm={3} lg={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Price
                        </Typography>
                        <Box sx={{ width: '100%' }}>
                            <Stack direction="row" justifyContent="space-evenly" alignItems="center">
                                <TextField
                                    label="min"
                                    type="tel"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ width: "90px" }}
                                    value={priceFiltered[0]}
                                    inputProps={{
                                        min: MIN_PRICE,
                                        max: MAX_PRICE
                                    }}
                                    placeholder={`from ${MIN_PRICE}`}
                                    onChange={(e) => {
                                        setPriceFiltered([Number(e.target.value), priceFiltered[1]]);
                                    }}
                                />
                                <Typography>-</Typography>
                                <TextField
                                    label="max"
                                    type="tel"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ width: "90px" }}
                                    value={priceFiltered[1]}
                                    inputProps={{
                                        min: MIN_PRICE,
                                        max: MAX_PRICE
                                    }}
                                    placeholder={`to ${MAX_PRICE}`}
                                    onChange={(e) => {
                                        setPriceFiltered([priceFiltered[0], Number(e.target.value)]);
                                    }}
                                />
                            </Stack>
                            <Slider
                                value={priceFiltered}
                                onChange={priceChange}
                                min={MIN_PRICE}
                                max={MAX_PRICE}
                            />
                        </Box>
                    </Grid>
                    <Divider></Divider>
                    <Grid item xs={12}>
                        <Box>
                            <Typography variant="h5">
                                Rating
                            </Typography>
                            <Box>
                                <RadioGroup
                                    value={ratingFiltered}
                                    onChange={ratingChange}
                                >
                                    <FormControlLabel value='f3' control={<Radio />} label={<>
                                        from
                                        <Rating
                                            name="text-feedback"
                                            value={3}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                    </>} />
                                    <FormControlLabel value="f4" control={<Radio />} label={<>
                                        from
                                        <Rating
                                            name="text-feedback"
                                            value={4}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                    </>} />
                                    <FormControlLabel value="none" control={<Radio />} label="Doesn't metter" />
                                </RadioGroup>
                            </Box>
                        </Box>
                    </Grid>
                    <Divider></Divider>
                    <Grid item xs={12}>
                        <Box>
                            <Typography variant="h5">
                                Delivery
                            </Typography>
                            <Box>
                                <RadioGroup
                                    value={deliveryFiltered}
                                    onChange={deliveryChange}
                                >
                                    <FormControlLabel value="today" control={<Radio />} label="Today" />
                                    <FormControlLabel value="todayOrTomorrow" control={<Radio />} label="Today or tomorrow" />
                                    <FormControlLabel value="lessWeek" control={<Radio />} label="Less than week" />
                                    <FormControlLabel value="none" control={<Radio />} label="Doesn't metter" />
                                </RadioGroup>
                            </Box>
                        </Box>
                    </Grid>
                    <Divider></Divider>
                    {/* <Grid item xs={12}>
                        <Button variant="contained" disableElevation fullWidth>
                            Submit filters
                        </Button>
                    </Grid> */}
                </Grid>
                <Grid container xs={6} sm={9} lg={10} columnSpacing={1} justifyContent={'center'}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <Select
                            value={sortingType}
                            onChange={sortChange}
                        >
                            {sortType.map(type => <MenuItem value={type.type}>{type.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <StoreTable products={productsFiltered} />
                </Grid>
            </Grid>
        </>
    )
}

export default Store