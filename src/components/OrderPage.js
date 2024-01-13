import React from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
const OrderPage = () => {
    const history = useNavigate();
    const location = useLocation();
    const cartArr = location?.state?.cartArr || [];
    const userId = location?.state?.userId || [];
    const uniqueId = uuidv4().replace(/[^0-9]/g, '').substring(0, 5);
    const order = ()=>{
        let total = 0;
        cartArr.map((item,)=>{
            total+=Number(item[0].Price);
        })
        let date = addDate()
        let orderData = {
            OrderID: Number(uniqueId),
            CustomerID: userId,
            OrderDate:date,
            TotalAmount:total,
            StoreID:1,
            OrderStatus:'New'
        }

        return orderData

    }
    const addDate = ()=>{
        function formatDayOrMonth(value) {
            return value < 10 ? '0' + value : value;
        }

        const currentDate = new Date();

        const day = formatDayOrMonth(currentDate.getDate());
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }
    const handleSubmit = async () =>{
        const addOrder = async ()=>{
            try{
                const response = await fetch('http://localhost:3000/orders/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(order()),
                });
                if(response.ok){
                    alert("Заказ принят")
                }
                else{
                    alert("Ошибка")
                    console.error('Ошибка при создании заказа');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        }
        const removeFromCart = async () => {
            try {
                const response = await fetch(`http://localhost:3000/cart/customer/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    await Promise.all(data.map(async (item) => {
                        const deleteResponse = await fetch(`http://localhost:3000/cart/${item.CartID}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        if (!deleteResponse.ok) {
                            console.log(`Error deleting item from cart: ${item.CartID}`);
                        }
                    }));
                } else {
                    console.error("Ошибка при получении данных корзины");
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        }
        const addOrderItem = async () =>{

            try{
                await Promise.all(cartArr.map(async (item)=>{
                    let orderItem = {
                        OrderID:Number(uniqueId),
                        ProductID: item[0].ProductID,
                        Quantity: 1,
                        Subtotal:Number(item[0].Price)

                }
                    const response = await fetch(`http://localhost:3000/order-items/`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify(orderItem)
                    })
                    if(!response.ok){
                        console.log("Ошибка добавления позиции в заказ")
                    }
                }))

            }
            catch(error){
                console.error('Ошибка при отправке запроса:', error);
            }
        }

        addOrder()
        addOrderItem()
        removeFromCart()
        history("/")
    }
    return (
        <div className={'order'}>
            <h1>Оформлення замовлення</h1>
            {cartArr.map((item, index) => (
                <div key={index} className={'orderItem'}>
                    <img src={item[0].ProductImage}></img>
                    <div className={'orderItemInfo'}>
                        <h2>{item[0].Name}</h2>
                        <p>Колір: {item[0].Color}</p>
                        <p className={'price'}>{parseFloat(item[0].Price)}₴</p>
                    </div>

                </div>
            ))}
            {cartArr.length > 0?(
                <button onClick={handleSubmit} className={'addToCart'}>Замовити</button>
            ):(
                <p>Тут нічого :(</p>
            )}

        </div>

    );
};

export default OrderPage;
