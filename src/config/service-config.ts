import AuthService from "../service/authService/AuthService";
import AuthServiceFire from "../service/authService/AuthServiceFire";
import OrdersService from "../service/ordersService/OrdersService";
import OrdersServiceFire from "../service/ordersService/OrdersServiceFire";
import ProductsService from "../service/productsService/ProductsService"
import ProductsServiceFire from "../service/productsService/ProductsServiceFire"

export const authService: AuthService = new AuthServiceFire();
export const productsService: ProductsService = new ProductsServiceFire();
export const ordersService: OrdersService = new OrdersServiceFire();
