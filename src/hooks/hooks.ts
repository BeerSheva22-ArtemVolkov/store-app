import { useDispatch } from "react-redux";
import CodeType from "../model/CodeType";
import { codeActions } from "../redux/slices/codeSlice";
import { useEffect, useMemo, useState } from "react";
import ProductType from "../model/ProductType";
import { Observable, Subscription, of } from "rxjs";
import { ordersService, productsService, usersService } from "../config/service-config";
import OrderType from "../model/OrderType";
import UserType from "../model/UserType";
import { useSelectorAuth } from "../redux/store";
import RouteType from "../model/RouteType";
import routesConfig from '../config/routes-config.json'
import UserDataType from "../model/UserDataType";

const { always, authenticated, admin, noadmin, noauthenticated, development } = routesConfig;

export function useDispatchCode() {

    const dispatch = useDispatch();

    return (successMessage: string, errorMessage: string) => {
        let code: CodeType = CodeType.OK;
        let message: string = '';
        console.log(errorMessage, successMessage);

        if (errorMessage) {
            if (errorMessage.includes('Authentication')) {
                code = CodeType.AUTH_ERROR;
                message = "Authentication error, mooving to Sign In";
            } else {
                code = errorMessage.includes('unavailable') ? CodeType.SERVER_ERROR : CodeType.UNKNOWN;
                message = errorMessage;
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
                    if (errorMessage) {
                        dispatch(errorMessage, '');
                    }
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
                    if (errorMessage) {
                        dispatch(errorMessage, '');
                    }
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
                    if (errorMessage) {
                        dispatch(errorMessage, '');
                    }
                }
            });
        return () => subscription.unsubscribe();
    }, []);

    return users;
}

// function getRoutes(userData: UserDataType): Observable<RouteType[]> {

//     const res: RouteType[] = [];
//     res.push(...always);

//     if (userData) {
//         res.push(...authenticated);
//         if (userData.role === 'admin') {
//             res.push(...admin)
//             if (process.env.NODE_ENV == "development") {
//                 res.push(...development)
//             }
//         } else {
//             res.push(...noadmin)
//         }
//     } else {
//         console.log('noauth');

//         res.push(...noauthenticated);
//     }
//     res.sort((r1, r2) => {
//         let res = 0;
//         if (r1.order && r2.order) {
//             res = r1.order - r2.order;
//         }
//         return res
//     });
//     return of(res)
// }

// export function useSelectorRoutes() {

//     // const dispatch = useDispatchCode();
//     // const [users, setUsers] = useState<UserType[]>([]);

//     const [routes, setRoutes] = useState<RouteType[]>([])

//     const userData = useSelectorAuth();

//     useEffect(() => {
//         const subscription: Subscription = getRoutes(userData)
//             .subscribe({
//                 next(routes: RouteType[]) {
//                     setRoutes(routes)
//                 }
//             });
//         return () => subscription.unsubscribe();
//     }, []);

//     return routes;
// }