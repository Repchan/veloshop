import React, { useState, useEffect } from 'react';
import responseToLocal from "../functions/ResponseToLocal";
import { useNavigate } from 'react-router-dom';
import {useActions} from "../hooks/useActions";
import {useSelector} from "react-redux";

const MainPage = (props) => {
    const testData = useSelector(state => state.cart.cartData)
    const navigate = useNavigate();
    const productUrl = "http://localhost:3000/products";
    const [products, setProducts] = useState([]);
    const [id, setId] = useState();
    const [auth , setAuth] = useState()
    const [type ,setType] = useState(0)
    const typeArr = [`Всі`,`Гірський` , `Шосейний` , `Фетбайк` , `Комфортний`, `BMX` , `Складний` , `Жіночий` , `Підлітковий` , `Дитячий` , `Інше`]
    const {fetchCart,addToCart} = useActions()
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
    const handleClick = (product) => {
        const data = {
            CustomerID:id,
            ProductID: product.ProductID,
            Quantity:1
        }
        fetchCart(data)
        addToCart(data)         //Допилить
        console.log(testData)
    };
    const handleRedirect = (object,userId) => {
        navigate('/product', { state: { object,userId} });
    };
    const handleClickType = (num) =>{
        setType(num)
    }
    return (
        <div className={'mainPage'}>
            <div className={'filter'}>
                <ul>
                    {/*Каждому li призначается свой номер, который соответствует номеру в масиве типов продуктов*/}
                    <li className={type === 0?'active':``} onClick={()=>handleClickType(0)}>Всі категорії</li>
                    <li className={type === 1?'active':``}  onClick={()=>handleClickType(1)}>Гірський велосипед</li>
                    <li className={type === 2?'active':``}  onClick={()=>handleClickType(2)}>Шосейний велосипед</li>
                    <li className={type === 3?'active':``} onClick={()=>handleClickType(3)}>Фетбайк</li>
                    <li className={type === 4?'active':``} onClick={()=>handleClickType(4)}>Комфортний велосипед</li>
                    <li className={type === 5?'active':``} onClick={()=>handleClickType(5)}>BMX</li>
                    <li className={type === 6?'active':``} onClick={()=>handleClickType(6)}>Складаний велосипед</li>
                    <li className={type === 7?'active':``} onClick={()=>handleClickType(7)}>Жіночий велосипед</li>
                    <li className={type === 8?'active':``} onClick={()=>handleClickType(8)}>Підлітковий велосипед</li>
                    <li className={type === 9?'active':``} onClick={()=>handleClickType(9)}>Велосипед дитячий</li>
                    <li className={type === 10?'active':``} onClick={()=>handleClickType(10)}>Інше</li>
                </ul>
            </div>
            <div className={"mainPageProducts"}>
                {type ===0? products.map((product, index) => (
                    //Тут выводятся все товары , так как type === 0 равняется всем товарам
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
                    //То что снизу отвечает за проверку по типу продукта
                )):products.map((product, index) => (
                    typeArr[type] === product.Type?
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
                    </div>:``
                ))}
            </div>
        </div>
    );
};

export default MainPage;
