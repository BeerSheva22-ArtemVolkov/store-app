import OrderStatusType from "./OrderStatusType";
import ProductType from "./ProductType";

type OrderType = {
    id?: any
    status: OrderStatusType
    dateStart: Date
    dateEnd?: Date
    updatedBy?: string
    total?: number
    userEmail: string
    cart: ProductType[]
}

export default OrderType;