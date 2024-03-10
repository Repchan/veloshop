import React, { useState, useEffect } from 'react';
import UserAccount from "./UserAccount";
import MainPage from "./MainPage";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import responseToLocal from "../functions/ResponseToLocal";
import Cart from "./Cart";
import orderPage from "./OrderPage";
import OrderPage from "./OrderPage";
import Orders from "./Orders";
import OrderInfo from "./OrderInfo";
import ProductView from "./ProductView";
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";
import AdminPanel from "./AdminPanel";
const Page = (props) => {
    const {addToCart} = useActions()
    const cartData = useSelector(state => state.cart.cartData)
    const [authorized,setAuthorized] = useState(false)
    useEffect(()=>{
        const checkLocalData = async()=>{
            const data = await responseToLocal();
            if(data!==undefined){
                setAuthorized(true)
            }
        }
        checkLocalData()

    })
    return (
        <Router>
            <div className="Page">
                <header>
                    <div className={'container'}>
                        <div className={'logo'}>
                            <Link to={'/'} href={'#'}>Veloshop</Link>
                        </div>
                        <div className={'navigation'}>
                            <ul className={'navigationHeaderList'}>
                                <li><Link to={'/'}>Товари</Link></li>
                                <li>Контакти</li>
                                <li><Link to={'/cart'}>Корзина - {cartData.length}</Link></li>
                                <li><Link to={`/orders`}>Замовленя</Link></li>
                            </ul>
                        </div>
                        <div className={'userNav'}>{authorized?(<UserAccount/>):(
                            <ul className={'userNavList'}>
                                <li><Link to="/signUp">Реєістрація</Link></li>
                                <li><Link to="/signIn">Вхід</Link></li>
                            </ul>
                        )}
                        </div>
                    </div>
                </header>
                <div className={'main'}>
                    <div className={'container'}>
                        <Routes>
                            <Route path={"/product"} element={<ProductView/>}></Route>
                            <Route path={"/OrderInfo"} element={<OrderInfo/>}></Route>
                            <Route path={"/OrderPage"} element={<OrderPage/>}></Route>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/signUp" element={<SignUp />} />
                            <Route path="/signIn" element={<LogIn />} />
                            <Route path={"/cart"} element={<Cart/>}/>
                            <Route path={"/orders"} element={<Orders/>}/>
                            <Route path={"/admin"} element={<AdminPanel/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}
export default Page;