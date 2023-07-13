import AuthService from "../service/authService/AuthService";
import AuthServiceFire from "../service/authService/AuthServiceFire";
import ProductsService from "../service/productService/ProductsService"
import ProductsServiceFire from "../service/productService/ProductsServiceFire"

export const authService: AuthService = new AuthServiceFire();
export const productsService: ProductsService = new ProductsServiceFire();