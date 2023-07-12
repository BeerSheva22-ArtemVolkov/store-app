import React, { useMemo } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navigator from './navigation/Navigator';
import Account from './pages/Account';
import Cart from './pages/Cart';
import CustomerOrders from './pages/CustomerOrders';
import Registration from './pages/Registration';
import SellerOrders from './pages/SellerOrders';
import SignIn from './pages/SignIn';
import RouteType from './model/RouteType';
import routesConfig from './config/routes-config.json'
import SignOut from './pages/SignOut';
import AdminAccount from './pages/AdminAccount';
import Store from './pages/Store';
import AddProduct from './pages/AddProduct';
import CustomerSettings from './pages/CustomerSettings';
import { useSelectorAuth } from './redux/store';
import UserDataType from './model/UserDataType';

const { always, authenticated, admin, noadmin, noauthenticated, development } = routesConfig;

function getRoutes(userData: UserDataType): RouteType[] {
    const res: RouteType[] = [];
    res.push(...always);
    console.log(userData);
    
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
        res.push(...noauthenticated);
    }
    res.sort((r1, r2) => {
        let res = 0;
        if (r1.order && r2.order) {
            res = r1.order - r2.order;
        }
        return res
    });
    if (userData) {
        res[res.length - 1].label = userData.email;
    }
    return res
}

const App: React.FC = () => {

    const userData = useSelectorAuth();
    const routes: RouteType[] = useMemo(() => getRoutes(userData), [userData])

    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigator routes={routes} />} >
                <Route index element={<Home />} />
                <Route path='/account' element={<Account />} >
                    <Route path='orders' element={<CustomerOrders />} />
                    <Route path='settings' element={<CustomerSettings />} />
                    <Route path='signin' element={<SignIn />} />
                    <Route path='registration' element={<Registration />} />
                    <Route path='signout' element={<SignOut />} />
                </Route>
                {/* <Route path='/admin' element={<AdminAccount />} > */}
                <Route path='orders' element={<SellerOrders />} />
                <Route path='addproduct' element={<AddProduct />} />
                {/* </Route> */}
                <Route path='store' element={<Store />} />
                <Route path='cart' element={<Cart />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default App;
