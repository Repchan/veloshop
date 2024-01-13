import React, { useState, useEffect } from 'react';
import responseToLocal from "../functions/ResponseToLocal";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const OrderInfo = (props) =>{
    const location = useLocation();
    const id = location?.state?.id || [];
    const [orderItemsArr,setordersItemsArr] = useState([])
    let sum = 0
    useEffect(()=>{
        const getItems = async ()=>{
            try{
                const response = await fetch(`http://localhost:3000/order-items/${id}`)
                if(response.ok){
                    const data = await response.json();
                    const arr = await getProducts(data)
                    setordersItemsArr(arr)
                }
                else(
                    console.error("Error")
                )
            }
            catch(error){
                console.error(error)
            }
        }
        const getProducts = async (data)=>{
            try{
                const productPromises = data.map(async (item)=>{
                    const response = await fetch(`http://localhost:3000/products/search/id/${item.ProductID}`)
                    if(response.ok){
                        const product = await response.json()
                        return product[0];
                    }
                    else(
                            console.error("Error")
                        )
                })
                const productArr = await Promise.all(productPromises);
                return productArr;
            }
            catch(error){
                console.error(error)
            }
        }

        getItems()
    },[])
    orderItemsArr.map((item)=>{
        sum+=parseFloat(item.Price);
    })
    return(
        <div className={'ordersInfoProducts'}>
            {orderItemsArr.map((item,index)=>(
                <div key={item.OrderItemID} className={'orderInfoProduct'}>
                    <img src={item.ProductImage}></img>
                    <div className={'orderInfoProductsInfo'}>
                        <h2>{item.Name}</h2>
                        <p>{item.ShortDescription}</p>
                        <p>Колір: <b>{item.Color}</b></p>
                        <p>Ціна: <b>{parseFloat(item.Price)}₴</b></p>
                    </div>

                </div>
            ))}
            <h2>Загальна сумма замовлення: {sum}₴</h2>
        </div>
    )
}
export default OrderInfo