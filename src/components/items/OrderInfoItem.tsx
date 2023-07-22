import { Box, FormControl, Grid, Input, InputAdornment, useMediaQuery, useTheme } from "@mui/material"
import ProductType from "../../model/ProductType"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import OrderType from "../../model/OrderType"
import { useSelectorAuth } from "../../redux/store"

type OrderInfoItemType = {
    order: OrderType
}

const OrderInfoItem: React.FC<OrderInfoItemType> = ({ order }) => {

    const userData = useSelectorAuth();

    const theme = useTheme();
    const isMD = useMediaQuery(theme.breakpoints.down('md'));

    const adminColumns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        }
    ]

    const startColumns: GridColDef[] = [
        {
            field: 'name', headerName: 'Name', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        },
        {
            field: 'quantity', headerName: 'Quantity', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        }
    ]

    const mdColumns: GridColDef[] = [
        {
            field: 'image', headerName: 'Image', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left', renderCell: (params) => <img src={params.value.url} height='50px'></img>
        }
    ]

    const endColumns: GridColDef[] = [
        {
            field: 'price', headerName: 'Price', type: 'number', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        }
    ]

    function getColumns(): GridColDef[] {
        let res: GridColDef[] = userData && userData.role == 'admin' ? adminColumns.concat(startColumns) : startColumns;
        if (!isMD) {
            res = res.concat(mdColumns);
        }
        res = res.concat(endColumns);
        return res;
    }

    return <Box>
        <Grid container spacing={2} paddingRight={'1vw'} paddingLeft={'1vw'} >
            <Grid item xs={12} sm={8}>
                <DataGrid columns={getColumns()} rows={order.cart} getRowId={(row: ProductType) => row.id} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Grid item>
                    <FormControl fullWidth variant="standard">
                        <Input
                            startAdornment={<InputAdornment position="start" style={{ width: '140px' }}>ID</InputAdornment>}
                            value={order.id}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="standard">
                        <Input
                            startAdornment={<InputAdornment position="start" style={{ width: '140px' }}>Status</InputAdornment>}
                            value={order.status}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="standard">
                        <Input
                            startAdornment={<InputAdornment position="start" style={{ width: '140px' }}>Date start</InputAdornment>}
                            value={order.dateStart}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="standard">
                        <Input
                            startAdornment={<InputAdornment position="start" style={{ width: '140px' }}>Date end</InputAdornment>}
                            value={order.dateEnd}
                        />
                    </FormControl>
                </Grid>
                {userData && userData.role == 'admin' && <Grid item>
                    <FormControl fullWidth variant="standard">
                        <Input
                            startAdornment={<InputAdornment position="start" style={{ width: '140px' }}>Email</InputAdornment>}
                            value={order.userEmail}
                        />
                    </FormControl>
                </Grid>}
                {userData && userData.role == 'admin' && <Grid item>
                    <FormControl fullWidth variant="standard">
                        <Input
                            startAdornment={<InputAdornment position="start" style={{ width: '140px' }}>Updated by</InputAdornment>}
                            value={order.updatedBy}
                        />
                    </FormControl>
                </Grid>}
                <Grid item>
                    <FormControl fullWidth variant="standard">
                        <Input
                            startAdornment={<InputAdornment position="start" style={{ width: '140px' }}>Total</InputAdornment>}
                            value={order.total}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    </Box>
}

export default OrderInfoItem