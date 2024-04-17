import React, {useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
const RemoveProduct = (props) =>{
    const [products, setProducts] = useState([]);
    const productUrl = "http://localhost:3000/products";
    const navigate = useNavigate();
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
    const handleRedirect = (object,userId) => {
        navigate('/product', { state: { object,userId} });
    };
    const handleRemove = (id) => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Товар успешно удален');
                } else {
                    console.log("Ошибка: " + response.status);
                }
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };
        fetchData();
        window.location.reload();
    };

    return(
        <>
            <div className={'removePanel'}>
                {products.map((product, index) => (
                    <div className={'mainProduct'} key={product.ProductID} >
                        <div className={'mainProductImageMask'} onClick={()=>handleRedirect(product)}>
                            <img className={'mainProductImage'} src={`../${product.ProductImage}`}></img>
                        </div>
                        <div className={'mainProductInfo'} >
                            <div className={'mainProductName'} onClick={()=>handleRedirect(product)}>
                                <h2>{product.Name}</h2>
                            </div>
                        </div>
                        <button onClick={()=>handleRemove(product.ProductID)}>Удалить</button>
                    </div> ))}
            </div>

        </>
    )
}
export default RemoveProduct;