import React, { useMemo } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Navigator from './components/navigation/Navigator';
import Account from './components/pages/Account';
import Cart from './components/pages/Cart';
import CustomerOrders from './components/pages/CustomerOrders';
import Registration from './components/pages/Registration';
import SellerOrders from './components/pages/SellerOrders';
import SignIn from './components/pages/SignIn';
import RouteType from './model/RouteType';
import routesConfig from './config/routes-config.json'
import SignOut from './components/pages/SignOut';
import CustomerSettings from './components/pages/CustomerSettings';
import { useSelectorAuth, useSelectorCode } from './redux/store';
import UserDataType from './model/UserDataType';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import StatusType from './model/StatusType';
import CodeType from './model/CodeType';
import { authActions } from './redux/slices/authSlice';
import { authService } from './config/service-config';
import { codeActions } from './redux/slices/codeSlice';
import Products from './components/pages/Products';
import PageType from './model/PagesType';
import pages from './config/store-pages';
import Redirect from './components/pages/Redirect';

const { always, authenticated, admin, noadmin, noauthenticated, development } = routesConfig;

function getStoreRoutes(obj: PageType) {
    return <Route path={obj.to}>
        <Route index element={obj.element} />
        {obj.sub.length && obj.sub.map(o => getStoreRoutes(o))}
    </Route>
}

function getRoutes(userData: UserDataType): RouteType[] {
    const res: RouteType[] = [];
    res.push(...always);

    if (userData) {
        res.push(...authenticated);
        if (userData.role === 'admin') {
            res.push(...admin)
            if (process.env.NODE_ENV == "development") {
                res.push(...development)
            }
        } else {
            res.push(...noadmin)
        }
    } else {
        console.log('noauth');

        res.push(...noauthenticated);
    }
    res.sort((r1, r2) => {
        let res = 0;
        if (r1.order && r2.order) {
            res = r1.order - r2.order;
        }
        return res
    });
    return res
}

const App: React.FC = () => {

    const code = useSelectorCode();
    const dispatch = useDispatch();

    const [alertMessage, severity] = useMemo(() => codeProcessing(), [code]);
    const userData = useSelectorAuth();
    const routes: RouteType[] = useMemo(() => getRoutes(userData), [userData])

    function codeProcessing(): [string, StatusType] {
        const res: [string, StatusType] = [code.message, 'success'];
        console.log(code);

        switch (code.code) {
            case CodeType.OK: res[1] = 'success'; break;
            case CodeType.SERVER_ERROR: res[1] = 'error'; break;
            case CodeType.UNKNOWN: res[1] = 'error'; break;
            case CodeType.AUTH_ERROR: res[1] = 'error';
                dispatch(authActions.reset());
                authService.logout()
        }

        return res;
    }



    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigator routes={routes} />} >
                {/* <Route path='/' element={<Navigator/>} > */}
                <Route index element={<Home />} />
                <Route path='/account' element={<Account />} >
                    <Route path='orders' element={<CustomerOrders />} />
                    <Route path='settings' element={<CustomerSettings />} />
                    <Route path='signin' element={<SignIn />} />
                    <Route path='registration' element={<Registration />} />
                    <Route path='signout' element={<SignOut />} />
                </Route>
                <Route path='orders' element={<SellerOrders />} />
                <Route path='adminorders' element={<SellerOrders />} />
                <Route path='/products' element={<Products />} />
                <Route path='cart' element={<Cart />} />
                <Route path='redirect' element={<Redirect />} />
                {getStoreRoutes(pages)}
            </Route>
        </Routes>
        <Snackbar open={!!alertMessage} autoHideDuration={5000} onClose={() => dispatch(codeActions.reset())}>
            <Alert onClose={() => dispatch(codeActions.reset())} severity={severity} sx={{ width: '100%' }}>
                {alertMessage}
            </Alert>
        </Snackbar>
    </BrowserRouter>
}

export default App;
