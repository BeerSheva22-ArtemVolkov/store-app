import { Box, Grid, Paper, Typography, styled, useTheme } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ProductType from "../model/ProductType";
import { Subscription } from "rxjs";
import { useSelectorProducts } from "../hooks/hooks";
import ProductItem from "../components/ProductItem";


const StoreTable: React.FC = () => {

    const products: ProductType[] = useSelectorProducts();

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch" justifyContent="flex-start" padding="1vw" >
            {
                products.map(product => {
                    return <Grid item xs={1} sm={4} md={3} xl={4} key={product.id}>
                        <ProductItem productItem={product} />
                    </Grid>
                })
            }
        </Grid >
    )
}

export default StoreTable