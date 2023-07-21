import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Modal, Select, Typography, useMediaQuery, useTheme } from "@mui/material"
import OrderType from "../model/OrderType";
import { useDispatchCode, useSelectorOrders } from "../hooks/hooks";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Delete } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import CheckIcon from '@mui/icons-material/Check';
import OrderInfoItem from "../components/OrderInfoItem";
import ProductType from "../model/ProductType";
import { ordersService } from "../config/service-config";
import { getISODateStr } from "../util/date-functions";
import { useSelectorAuth } from "../redux/store";
import StatusType from "../model/StatusType";
import OrderStatusType, { OrderStatusTypeArray } from "../model/OrderStatusType";

const OrdersTable: React.FC = () => {

    const userData = useSelectorAuth();
    const theme = useTheme();
    const dispatchCode = useDispatchCode()

    const isSM = useMediaQuery(theme.breakpoints.down('sm'));
    const isMD = useMediaQuery(theme.breakpoints.down('md'));
    const isLG = useMediaQuery(theme.breakpoints.down('lg'));

    const startColumns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', flex: 0.15, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left',
        },
        {
            field: 'status', headerName: 'Status', flex: 0.15, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        }
    ]

    const mdColumns: GridColDef[] = [
        {
            field: 'dateStart', headerName: 'Order date', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        },
        {
            field: 'dateEnd', headerName: 'Update date', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        }
    ]

    const adminColumns: GridColDef[] = [
        {
            field: 'userEmail', headerName: 'Customer email', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        },
        {
            field: 'updatedBy', headerName: 'Updated By', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        }
    ]

    const endColumns: GridColDef[] = [
        {
            field: 'total', headerName: 'Total ₪', flex: 0.15, headerClassName: 'data-grid-header',
            align: 'left', headerAlign: 'left'
        },
        {
            field: 'actions', type: "actions", flex: 0.2, getActions: (params) => {
                const row: OrderType = params.row
                const disableButton: boolean = row.status == "Deleted" || row.status == "Done"
                let res = [<GridActionsCellItem label="info" icon={<InfoIcon />} onClick={() => orderInfo(params.id)} />]
                if (userData?.role == "admin") {
                    res.push(<GridActionsCellItem disabled={disableButton} label="update" icon={<UpdateIcon />} onClick={() => orderUpdate(params.id)} />,
                        <GridActionsCellItem disabled={disableButton} label="remove" icon={<Delete />} onClick={() => orderDelete(params.id)} />)
                }
                return res;
            }
        }
    ]

    const orders: OrderType[] = useSelectorOrders();
    const columns = useMemo(() => getColumns(), [orders, isSM, isMD, isLG]);

    const [currentOrders, setCurrentOrders] = useState<OrderType[]>(orders)
    const [infoOpened, setInfoOpened] = useState<boolean>(false)
    const [deleteOpened, setDeleteOpened] = useState<boolean>(false)
    const [updateOpened, setUpdateOpened] = useState<boolean>(false)
    const [status, setStatus] = useState<OrderStatusType>('New')
    const [orderID, setOrderID] = useState<any>('')
    const [order, setOrder] = useState<OrderType | undefined>()

    useEffect(() => {
        setCurrentOrders(userData && userData.role == 'admin' ? orders : orders.filter(order => order.userEmail == userData?.email))
    }, [orders])

    function orderInfo(id: any) {
        setOrderID(id)
        setOrder(orders.find(item => item.id == id))
        setInfoOpened(true)
    }

    function orderDelete(id: any) {
        setOrderID(id)
        setStatus("Deleted")
        setDeleteOpened(true)
    }

    function orderUpdate(id: any) {
        setOrderID(id)
        setUpdateOpened(true)
    }

    function getColumns(): GridColDef[] {
        let res: GridColDef[] = startColumns;
        if (!isMD) {
            res = res.concat(mdColumns);
        }
        if (userData && userData.role == 'admin' && !isLG) {
            res = res.concat(adminColumns);
        }
        res = res.concat(endColumns);
        return res;
    }

    const closeDeleteDialog = () => {
        setDeleteOpened(false);
    };

    const closeUpdateDialog = () => {
        setUpdateOpened(false);
    };

    function actualUpdating() {

        console.log('updating');
        
        const successMessage: string = status == "Deleted" ? 'Order deleted' : 'Order updated'
        let errorMessage: string = ''

        const order: OrderType = orders.find(item => item.id == orderID)!
        try {
            ordersService.updateOrder({ ...order, status, dateEnd: getISODateStr(new Date()), updatedBy: userData?.email })
        } catch (error: any) {
            errorMessage = error.message
        }
        console.log(successMessage, errorMessage);
        closeUpdateDialog()
        closeDeleteDialog()
        dispatchCode(successMessage, errorMessage)


    }

    const statusHandler = (event: any) => {
        setStatus(event.target.value)
    }

    return (
        <Box>
            <Box sx={{ height: '80vh', width: '95vw' }}>
                <DataGrid columns={columns} rows={currentOrders} />
            </Box>

            <Dialog open={infoOpened} onClose={() => setInfoOpened(false)} fullWidth maxWidth={"xl"}>
                <Box>
                    <OrderInfoItem order={order!} />
                </Box>
            </Dialog>

            <Dialog open={deleteOpened} onClose={closeDeleteDialog} fullWidth maxWidth={"xs"}>
                <DialogTitle>Delete order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you want to delete order {orderID}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeDeleteDialog}>
                        Close
                    </Button>
                    <Button onClick={actualUpdating} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={updateOpened} onClose={closeUpdateDialog} fullWidth maxWidth={"xs"}>
                <DialogTitle>Change status {orderID}</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ mt: 2, minWidth: 120 }}>
                        <InputLabel htmlFor="max-width">Status</InputLabel>
                        <Select
                            autoFocus
                            value={status}
                            onChange={statusHandler}
                            label="Status"
                        >
                            {OrderStatusTypeArray.map(status => <MenuItem value={status}>{status}</MenuItem>)}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeUpdateDialog}>
                        Close
                    </Button>
                    <Button onClick={actualUpdating} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        </Box >
    )
}

export default OrdersTable