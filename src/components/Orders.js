import React, { useState, useEffect } from 'react';
import responseToLocal from "../functions/ResponseToLocal";
import { useNavigate } from 'react-router-dom';


const Orders = (props) => {
    const [userId, setId] = useState();
    const [orderArr, setOrderArr] = useState([]); // Используйте пустой массив по умолчанию
    const navigate = useNavigate();
    useEffect(() => {
        const checkLocalData = async () => {
            const localData = await responseToLocal();
            if (localData !== undefined) {
                setId(prevId => localData.customerID);
            }
        };

        checkLocalData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/orders/customer/${userId}`);
                if (response.ok) {
                    const data = await response.json();

                    setOrderArr(prevData => data);
                } else {
                    console.error("Ошибка при запросе данных");
                }
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [userId]);
    const handleRedirect = (id) => {
        navigate('/OrderInfo', { state: { id} });
    };
    return (
        <div className={'orders'}>
            {orderArr.map((item)=>(
                <div key={item.OrderID} className={'orderInfoItem'}>
                    <p>Order Nº{item.OrderID}</p>
                    <p>{item.OrderStatus}</p>
                    <p>Замовлення створене: {item.OrderDate}</p>
                    <p>До сплати: {parseFloat(item.TotalAmount)}₴</p>
                    <button onClick={()=>handleRedirect(item.OrderID)} className={'addToCart'}>Детально</button>
                </div>
            )
            )}
        </div>
    );
};

export default Orders;
