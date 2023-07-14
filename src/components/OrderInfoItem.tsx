import { Box, Grid } from "@mui/material"
import ProductType from "../model/ProductType"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', flex: 0.3, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'name', headerName: 'Name', flex: 0.7, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'quantity', headerName: 'Quantity', flex: 0.3, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'image', headerName: 'Image', flex: 0.7, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center', renderCell: (params) => <img src={params.value} height='50px'></img>
    },
    {
        field: 'price', headerName: 'Price', type: 'number', flex: 0.7, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
]

type OrderInfoItemType = {
    orderProducts: ProductType[]
}

const OrderInfoItem: React.FC<OrderInfoItemType> = ({ orderProducts }) => {
    return <Box sx={{ flexGrow: 1 }}>
        <DataGrid columns={columns} rows={orderProducts} getRowId={(row: ProductType) => row.id} />
    </Box>
}

export default OrderInfoItem