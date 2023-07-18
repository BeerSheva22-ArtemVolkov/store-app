import { Box, Grid, Input, InputAdornment, TextField, Typography } from "@mui/material"
import ProductType from "../model/ProductType"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import OrderType from "../model/OrderType"
import { useSelectorAuth } from "../redux/store"

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header',
        align: 'left', headerAlign: 'left'
    },
    {
        field: 'name', headerName: 'Name', flex: 0.2, headerClassName: 'data-grid-header',
        align: 'left', headerAlign: 'left'
    },
    {
        field: 'quantity', headerName: 'Quantity', flex: 0.2, headerClassName: 'data-grid-header',
        align: 'left', headerAlign: 'left'
    },
    {
        field: 'image', headerName: 'Image', flex: 0.2, headerClassName: 'data-grid-header',
        align: 'left', headerAlign: 'left', renderCell: (params) => <img src={params.value} height='50px'></img>
    },
    {
        field: 'price', headerName: 'Price', type: 'number', flex: 0.2, headerClassName: 'data-grid-header',
        align: 'left', headerAlign: 'left'
    },
]

type OrderInfoItemType = {
    order: OrderType
}

const OrderInfoItem: React.FC<OrderInfoItemType> = ({ order }) => {

    // return <Box sx={{ flexGrow: 1 }}>
    //     <DataGrid columns={columns} rows={order.cart} getRowId={(row: ProductType) => row.id} />
    // </Box>
    console.log(order);

    return <Box>
        <Grid container spacing={2} paddingRight={'1vw'} paddingLeft={'1vw'} >
            <Grid item xs={7} md={9}>
                <DataGrid columns={columns} rows={order.cart} getRowId={(row: ProductType) => row.id} />
            </Grid>
            <Grid item xs={5} md={3}>
                <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <Grid container alignItems="flex-end">
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <Box width={'140px'}>
                                                <InputAdornment position="start">
                                                    ID
                                                </InputAdornment>
                                            </Box>
                                        ),
                                        style: { fontSize: 16 }
                                    }}
                                    variant="standard"
                                    value={order.id}
                                    size="small"
                                    style={{ fontSize: 5 }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <Box width={'140px'}>
                                                <InputAdornment position="start">
                                                    Status
                                                </InputAdornment>
                                            </Box>
                                        ),
                                        style: { fontSize: 16 }
                                    }}
                                    variant="standard"
                                    value={order.status}
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <Box width={'140px'}>
                                                <InputAdornment position="start">
                                                    Date start
                                                </InputAdornment>
                                            </Box>
                                        ),
                                        style: { fontSize: 16 }
                                    }}
                                    variant="standard"
                                    value={order.dateStart}
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <Box width={'140px'}>
                                                <InputAdornment position="start">
                                                    Date end
                                                </InputAdornment>
                                            </Box>
                                        ),
                                        style: { fontSize: 16 }
                                    }}
                                    variant="standard"
                                    value={order.dateEnd}
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <Box width={'140px'}>
                                                <InputAdornment position="start">
                                                    User email
                                                </InputAdornment>
                                            </Box>
                                        ),
                                        style: { fontSize: 16 }
                                    }}
                                    variant="standard"
                                    value={order.userEmail}
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <Box width={'140px'}>
                                                <InputAdornment position="start">
                                                    Updated by
                                                </InputAdornment>
                                            </Box>
                                        ),
                                        style: { fontSize: 16 }
                                    }}
                                    variant="standard"
                                    value={order.updatedBy}
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <Box width={'140px'}>
                                                <InputAdornment position="start">
                                                    Total
                                                </InputAdornment>
                                            </Box>
                                        ),
                                        style: { fontSize: 16 }
                                    }}
                                    variant="standard"
                                    value={order.total}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
            </Grid>
        </Grid>

    </Box>
}

export default OrderInfoItem