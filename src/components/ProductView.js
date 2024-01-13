import React, {useState,useEffect} from "react";
import {useLocation} from "react-router-dom";

const ProductView = (props)=>{
    const location = useLocation();
    const object = location?.state?.object || [];
    const userId = location?.state?.userId
    const handleClick = async (product) => {
        const data = {
            CustomerID:userId,
            ProductID: product.ProductID,
            Quantity:1
        }
        try {
            const response = await fetch('http://localhost:3000/cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert("Додано у корзину");
            } else {
                // Обработка ошибок
                console.error('Ошибка');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };
    return(

        <div className={'productView'}>

            <div className={'bigPictureMask'}>
                <img  src={object.ProductImage}></img>
            </div>
            <div className={'productViewInfo'}>
                {console.log(object)}
                <h2>{object.Name}</h2>
                <p>{object.Description}</p>
                <p>Бренд: <b>{object.Brand}</b></p>
                <p>Колір: <b>{object.Color}</b></p>
                <p>Кількість на складі: <b>{object.QuantityInStock}</b></p>
                <p className={'price'}>{object.Price}₴</p>
                <button className={"addToCart"} onClick={() => handleClick(object)}>
                    Додати до кошика
                </button>
            </div>

        </div>
    )
}
export default ProductView;