import { Observable } from "rxjs";
import OrderType from "../../model/OrderType";

export default interface OrdersService {
    addOrder(order: OrderType): Promise<OrderType>;
    getOrders(): Observable<OrderType[] | string>;
    getOrder(orderID: any): Promise<OrderType | string>
    updateOrder(product: OrderType): Promise<OrderType>;
}