import { Box, Divider, FormControl, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Rating, Select, SelectChangeEvent, Slide, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import ProductType from "../../model/ProductType";
import { useSelectorProducts } from "../../hooks/hooks";
import StoreTable from "../tables/StoreTable";
import Slider from '@mui/material/Slider';
import StarIcon from '@mui/icons-material/Star';
import { MIN_PRICE, MAX_PRICE, ratingsArray, deliveryArray, sortType } from "../../config/catalog-config";

type categories = {
    inputCategories: string[]
}

const Store: React.FC<categories> = ({ inputCategories }) => {

    const products: ProductType[] = useSelectorProducts();
    const productsStart: ProductType[] = products.slice().filter(product => inputCategories.every(category => product.categories.includes(category)))

    const [productsFiltered, setProductsFiltered] = useState<ProductType[]>(productsStart.slice())
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
        setSortingType(event.target.value as string);
    };

    useEffect(() => {
        let productsSort: ProductType[] = productsStart.slice()
        console.log(productsSort);

        switch (sortingType) {
            case 'priceAscending':
                productsSort.sort((p1, p2) => p1.price - p2.price)
                break
            case 'priceDescending':
                productsSort.sort((p1, p2) => p2.price - p1.price)
                break
            case 'ratingAscending':
                productsSort.sort((p1, p2) => p1.rating.rate - p2.rating.rate)
                break
            case 'ratingDescending':
                productsSort.sort((p1, p2) => p2.rating.rate - p1.rating.rate)
                break
            default:
                productsSort = productsStart.slice()
        }
        setProductsFiltered(productsSort
            .filter(product => product.price <= priceFiltered[1] && product.price >= priceFiltered[0])
            .filter(product => product.rating.rate >= ratingsArray.find(val => val.name == ratingFiltered)!.rating)
            .filter(product => product.deliveryDays <= deliveryArray.find(val => val.name == deliveryFiltered)!.deliveryDays)
        )
        return () => setProductsFiltered(productsStart.slice())
    }, [products, priceFiltered, ratingFiltered, deliveryFiltered, sortingType, inputCategories])

    return (
        <>
            <Grid container paddingRight={'5%'} paddingLeft={'5%'} spacing={1} >
                <Grid item xs={6} sm={3} lg={2}>
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
                        <Divider></Divider>
                    </Grid>
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
                        <Divider></Divider>
                    </Grid>
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
                        <Divider></Divider>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Button variant="contained" disableElevation fullWidth>
                            Submit filters
                        </Button>
                    </Grid> */}
                </Grid>
                <Grid container item xs={6} sm={9} lg={10} >
                    <Grid item xs={12} display={'flex'}>
                        <FormControl sx={{ m: 1, width: 300, mx: 'auto' }} >
                            <Select
                                value={sortingType}
                                onChange={sortChange}
                            >
                                {sortType.map(type => <MenuItem value={type.type}>{type.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <StoreTable products={productsFiltered} />
                </Grid>
            </Grid>
        </>
    )
}

export default Store