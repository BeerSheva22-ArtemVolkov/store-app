import { Box, Button, Divider, FormControlLabel, Grid, Paper, Radio, RadioGroup, Rating, Stack, TextField, Typography, styled, useTheme } from "@mui/material"
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

const Store: React.FC = () => {

    const products: ProductType[] = useSelectorProducts();
    const [price, setPrice] = useState<number[]>([0, 0]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setPrice(newValue as number[]);
    };

    return (
        <>
            <Grid container paddingRight={'5vw'} paddingLeft={'5vw'} spacing={2}>
                <Grid xs={3}>
                    <Grid item xs={12}>
                        {/* <Box> */}
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
                                    value={price[0]}
                                    inputProps={{
                                        min: MIN_PRICE,
                                        max: MAX_PRICE
                                    }}
                                    placeholder={`from ${MIN_PRICE}`}
                                    onChange={(e) => {
                                        setPrice([Number(e.target.value), price[1]]);
                                    }}
                                />
                                <Typography>-</Typography>
                                <TextField
                                    label="max"
                                    type="tel"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ width: "90px" }}
                                    value={price[1]}
                                    inputProps={{
                                        min: MIN_PRICE,
                                        max: MAX_PRICE
                                    }}
                                    placeholder={`to ${MAX_PRICE}`}
                                    onChange={(e) => {
                                        setPrice([price[0], Number(e.target.value)]);
                                    }}
                                />
                            </Stack>
                            <Slider
                                value={price}
                                onChange={handleChange}
                                min={MIN_PRICE}
                                max={MAX_PRICE}
                            />
                        </Box>
                        {/* </Box> */}
                    </Grid>
                    <Divider></Divider>
                    <Grid item xs={12}>
                        <Box>
                            <Typography variant="h5">
                                Rating
                            </Typography>
                            <Box>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="f3" control={<Radio />} label={<>
                                        <>from</>
                                        <Rating
                                            name="text-feedback"
                                            value={3}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        /></>} />
                                    <FormControlLabel value="f4" control={<Radio />} label={<>
                                        <>from</>
                                        <Rating
                                            name="text-feedback"
                                            value={4}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        /></>} />
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
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
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
                    <Grid item xs={12}>
                        <Button variant="contained" disableElevation fullWidth>
                            Submit filters
                        </Button>
                    </Grid>
                </Grid>
                <Grid container xs={9}>
                    <StoreTable />
                </Grid>

            </Grid>
        </>
    )
}

export default Store