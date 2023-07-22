import { Grid } from "@mui/material"
import ProductType from "../../model/ProductType";
import ProductItem from "../items/ProductItem";

type storeTableProps = {
    products: ProductType[]
}

const StoreTable: React.FC<storeTableProps> = ({ products }) => {

    return (
        <Grid container item spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 8, md: 12 }} alignItems="stretch" justifyContent="flex-start" padding="2vw">
            {
                products.map(product => {
                    return <Grid item xs={1} sm={3} md={3} xl={3} key={product.id}>
                        <ProductItem productItem={product} />
                    </Grid>
                })
            }
        </Grid >
    )
}

export default StoreTable