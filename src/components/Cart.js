import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import responseToLocal from "../functions/ResponseToLocal";
import OrderPage from "./OrderPage";

const Cart = (props) => {
    const [userId, setId] = useState();
    const [cartArr, setCartArr] = useState([]);
    const navigate = useNavigate(); // Хук для программного перенаправления

    useEffect(() => {
        const checkLocalData = async () => {
            const localData = await responseToLocal();
            if (localData !== undefined) {
                setId(localData.customerID);
            }
        };

        checkLocalData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId !== undefined) {
                    const response = await fetch(`http://localhost:3000/cart/customer/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        const productArr = data.map(item => ({ id: item.ProductID }));
                        fetchProductData(productArr);
                    } else {
                        console.log("Error: " + response.status);
                    }
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        const fetchProductData = async (productArr) => {
            try {
                const newData = await Promise.all(productArr.map(async (product) => {
                    if (product !== undefined) {
                        const productResponse = await fetch(`http://localhost:3000/products/search/id/${product.id}`);
                        if (productResponse.ok) {
                            const data = await productResponse.json();
                            return data;
                        }
                    }
                    return null;
                }));

                setCartArr(newData.filter(item => item !== null));
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchData();
    }, [userId]);

    const handleRedirect = () => {
        navigate('/OrderPage', { state: { cartArr, userId } });
    };

    return (
        <div className={'cart'}>
            <h1>Ваш кошик</h1>
            {cartArr.map((item, index) => (
                <div key={index} className={'cartItem'}>
                    <img src={item[0].ProductImage}></img>
                    <div className={'cartItemInfo'}>
                        <h2>{item[0].Name}</h2>
                        <p>Колір: {item[0].Color}</p>
                        <p className={'price'}>{parseFloat(item[0].Price)}₴</p>
                    </div>

                </div>
            ))}
            {cartArr.length > 0?(
                <button onClick={handleRedirect} className={'addToCart'}>Оформити замовлення</button>
            ):(
                <p>Тут нічого :(</p>
            )}

        </div>
    );
};

export default Cart;
