import React, { useState, useEffect } from 'react';
import responseToLocal from "../functions/ResponseToLocal";
import { useNavigate } from 'react-router-dom';
const MainPage = (props) => {
    const navigate = useNavigate();
    const productUrl = "http://localhost:3000/products";
    const [products, setProducts] = useState([]);
    const [id, setId] = useState();
    const [auth , setAuth] = useState()
    useEffect(() => {
        const checkLocalData = async () => {
            const localData = await responseToLocal();
            if(localData!==undefined){
                setId(localData.customerID)
                setAuth(localData.auth)
            }
        };
        checkLocalData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(productUrl);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.log("Error: " + response.status);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    const handleClick = async (product) => {
        const data = {
            CustomerID:id,
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
    const handleRedirect = (object,userId) => {
        navigate('/product', { state: { object,userId} });
    };
    return (
        <div className={'mainPage'}>
            <div className={'filter'}>
                <ul>
                    <li className={'active'}>Гірський велосипед</li>
                    <li>Шосейний велосипед</li>
                    <li>Фетбайк</li>
                    <li>Комфортний велосипед</li>
                    <li>BMX</li>
                    <li>Складаний велосипед</li>
                    <li>Жіночий велосипед</li>
                    <li>Підлітковий велосипед</li>
                    <li>Велосипед дитячий</li>
                    <li>Інше</li>
                </ul>
            </div>
            <div className={"mainPageProducts"}>
                {products.map((product, index) => (

                    <div className={'mainProduct'} key={product.ProductID} >
                        <div className={'mainProductImageMask'} onClick={()=>handleRedirect(product,id)}>
                            <img className={'mainProductImage'} src={product.ProductImage}></img>
                        </div>
                        <div className={'mainProductInfo'} >
                            <div className={'mainProductName'} onClick={()=>handleRedirect(product,id)}>
                                <h2>{product.Name}</h2>
                            </div>
                            <div className={'description'}>{product.ShortDescription}</div>
                            <p className={'price'}>{parseFloat(product.Price)}₴</p>
                            {auth?(<button className={"addToCart"} onClick={() => handleClick(product)}>
                                Додати до кошика
                            </button>):(<></>)}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
