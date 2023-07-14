import { useDispatch } from "react-redux";
import CodeType from "../model/CodeType";
import { codeActions } from "../redux/slices/codeSlice";
import { useEffect, useState } from "react";
import ProductType from "../model/ProductType";
import { Subscription } from "rxjs";
import { ordersService, productsService } from "../config/service-config";
import OrderType from "../model/OrderType";

export function useDispatchCode() {
    const dispatch = useDispatch();
    return (error: string, successMessage: string) => {
        let code: CodeType = CodeType.OK;
        let message: string = '';

        if (error.includes('Authentication')) {
            code = CodeType.AUTH_ERROR;
            message = "Authentication error, mooving to Sign In";
        } else {
            code = error.includes('unavailable') ? CodeType.SERVER_ERROR : CodeType.UNKNOWN;
            message = error;
        }
        dispatch(codeActions.set({ code, message: message || successMessage }))
    }
}

export function useSelectorProducts() {
    const dispatch = useDispatchCode();
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const subscription: Subscription = productsService.getProducts()
            .subscribe({
                next(productArray: ProductType[] | string) {
                    let errorMessage: string = '';
                    if (typeof productArray === 'string') {
                        errorMessage = productArray;
                    } else {
                        setProducts(productArray);
                    }
                    dispatch(errorMessage, '');
                }
            });
        return () => subscription.unsubscribe();
    }, []);
    return products;
}

export function useSelectorOrders() {
    const dispatch = useDispatchCode();
    const [orders, setOrders] = useState<OrderType[]>([]);

    useEffect(() => {
        const subscription: Subscription = ordersService.getOrders()
            .subscribe({
                next(productArray: OrderType[] | string) {
                    let errorMessage: string = '';
                    if (typeof productArray === 'string') {
                        errorMessage = productArray;
                    } else {
                        setOrders(productArray);
                    }
                    dispatch(errorMessage, '');
                }
            });
        return () => subscription.unsubscribe();
    }, []);
    return orders;
}