import { useDispatch } from "react-redux";
import CodeType from "../model/CodeType";
import { codeActions } from "../redux/slices/codeSlice";
import { useEffect, useState } from "react";
import ProductType from "../model/ProductType";
import { Subscription } from "rxjs";
import { ordersService, productsService, usersService } from "../config/service-config";
import OrderType from "../model/OrderType";
import UserType from "../model/UserType";

export function useDispatchCode() {
    const dispatch = useDispatch();
    return (error: string, successMessage: string) => {
        let code: CodeType = CodeType.OK;
        let message: string = '';
        console.log(error, successMessage);
        
        if (error) {
            if (error.includes('Authentication')) {
                code = CodeType.AUTH_ERROR;
                message = "Authentication error, mooving to Sign In";
            } else {
                code = error.includes('unavailable') ? CodeType.SERVER_ERROR : CodeType.UNKNOWN;
                message = error;
            }
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

export function useSelectorUsers() {
    const dispatch = useDispatchCode();
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const subscription: Subscription = usersService.getUsers()
            .subscribe({
                next(usersArray: UserType[] | string) {
                    let errorMessage: string = '';
                    if (typeof usersArray === 'string') {
                        errorMessage = usersArray;
                    } else {
                        setUsers(usersArray);
                    }
                    dispatch(errorMessage, '');
                }
            });
        return () => subscription.unsubscribe();
    }, []);

    return users;
}