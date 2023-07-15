import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Modal, Select, Typography, useTheme } from "@mui/material"
import OrderType from "../model/OrderType";
import { useSelectorOrders } from "../hooks/hooks";
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

const columnsCommon: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', flex: 0.3, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center',
    },
    {
        field: 'status', headerName: 'Status', flex: 0.3, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'dateStart', headerName: 'Date of order', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'dateEnd', headerName: 'Changing date', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    },
    {
        field: 'total', headerName: 'Total ₪', flex: 0.3, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'
    }
]

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type OrdersTableProps = {
    
}

const OrdersTable: React.FC = () => {

    const columnsAdmin: GridColDef[] = [
        {
            field: 'userEmail', headerName: 'Customer email', flex: 0.7, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'updatedBy', headerName: 'Updated By', flex: 0.7, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'actions', type: "actions", flex: 0.7, getActions: (params) => {
                const row: OrderType = params.row
                const disableButton: boolean = row.status == "Deleted" || row.status == "Done"
                return [
                    <GridActionsCellItem label="info" icon={<InfoIcon />} onClick={() => orderInfo(params.id)} />,
                    <GridActionsCellItem disabled={disableButton} label="update" icon={<UpdateIcon />} onClick={() => orderUpdate(params.id)} />,
                    // <GridActionsCellItem disabled={disableButton} label="status" icon={<CheckIcon />} />,
                    <GridActionsCellItem disabled={disableButton} label="remove" icon={<Delete />} onClick={() => orderDelete(params.id)} />,
                ];
            }
        }
    ]

    // const theme = useTheme()
    const userData = useSelectorAuth();
    const orders: OrderType[] = useSelectorOrders();
    const columns = useMemo(() => getColumns(), [orders]);

    const [currentOrders, setCurrentOrders] = useState<OrderType[]>(orders)
    const [infoOpened, setInfoOpened] = useState<boolean>(false)
    const [deleteOpened, setDeleteOpened] = useState<boolean>(false)
    const [updateOpened, setUpdateOpened] = useState<boolean>(false)
    const [status, setStatus] = useState<OrderStatusType>('New')
    const [orderID, setOrderID] = useState<any>('')
    const [cartItems, setCartItems] = useState<ProductType[]>([])
    const [orderStatuses, setOrderStatuses] = useState(OrderStatusTypeArray)
    const [columnsOrder, setColumnsOrder] = useState<string[]>([])

    useEffect(() => {
        setCurrentOrders(userData && userData.role == 'admin' ? orders : orders.filter(order => order.userEmail == userData?.email))
    }, [orders])

    function orderInfo(id: any) {
        setOrderID(id)
        setCartItems(orders.find(item => item.id == id)!.cart)
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
        let res: GridColDef[] = columnsCommon;
        // if (!isPortrait) {
        //     res = res.concat(columnsPortrait);
        // if (userData && userData.role == 'admin') {
            res = res.concat(columnsAdmin);
        // }
        // } else {
        //     res = res.concat(columnDetails);
        // }

        return res;
    }

    const closeDeleteDialog = () => {
        setDeleteOpened(false);
    };

    const closeUpdateDialog = () => {
        setUpdateOpened(false);
    };

    const actualUpdating = () => {
        const order: OrderType = orders.find(item => item.id == orderID)!
        ordersService.updateOrder({ ...order, status, dateEnd: getISODateStr(new Date()), updatedBy: userData?.email })
        closeUpdateDialog()
        closeDeleteDialog()
    }

    const statusHandler = (event: any) => {
        setStatus(event.target.value)
    }

    // useEffect(() => {
    //     const order: OrderType | undefined = orders.find(item => item.id == orderID)
    //     if (order){
    //         const currentOrderStatus = order.status
    //         console.log(currentOrderStatus);

    //         const currentOrderStatusIndex = orderStatuses.findIndex(status => status == currentOrderStatus)
    //         console.log(currentOrderStatusIndex);
    //         setOrderStatuses(orderStatuses.slice(currentOrderStatusIndex + 1, OrderStatusTypeArray.length))
    //     }

    // }, [orderID])

    return (
        <Box>
            <Box sx={{ height: '80vh', width: '95vw' }}>
                <DataGrid columns={columns} rows={currentOrders} />
            </Box>

            <Modal
                open={infoOpened}
                onClose={() => {
                    setInfoOpened(false)
                }}
            >
                <Box sx={style}>
                    <OrderInfoItem orderProducts={cartItems} />
                </Box>
            </Modal>

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

        </Box>
    )
}

export default OrdersTable