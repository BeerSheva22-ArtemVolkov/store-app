import OrderStatusType from "./OrderStatusType";
import PaymentType from "./PaymentType";
import ProductType from "./ProductType";

type OrderType = {
    id?: any
    paymentMethod: PaymentType
    status: OrderStatusType
    dateStart: Date
    dateEnd?: Date
    updatedBy?: string
    total?: number
    userEmail: string
    cart: ProductType[]
}

export default OrderType;