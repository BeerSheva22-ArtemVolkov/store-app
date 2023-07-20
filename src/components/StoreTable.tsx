import { Box, Grid, Paper, Typography, styled, useTheme } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ProductType from "../model/ProductType";
import { Subscription } from "rxjs";
import { useSelectorProducts } from "../hooks/hooks";
import ProductItem from "../components/ProductItem";

type storeTableProps = {
    products: ProductType[]
}

const StoreTable: React.FC<storeTableProps> = ({ products }) => {

    return (
        <Grid container item spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }} alignItems="stretch" justifyContent="flex-start" padding="2vw">
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