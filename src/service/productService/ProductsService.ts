import { Observable } from "rxjs";
import ProductType from "../../model/ProductType";

export default interface EmployeesService {
    addProduct(product: ProductType): Promise<ProductType>;
    getProducts(): Observable<ProductType[] | string>;
    // deleteEmployee(id: any): Promise<void>;
    updateProduct(product: ProductType): Promise<ProductType>;
}