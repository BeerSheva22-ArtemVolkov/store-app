import { Typography } from "@mui/material"
import OrdersTable from "../tables/OrdersTable"

const CastomerOrders: React.FC = () => {

    return <>
        <Typography variant="h4">
            Your orders
        </Typography >
        <OrdersTable />
    </>
}

export default CastomerOrders