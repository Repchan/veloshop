import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const AddNewProduct = (props)=>{
    const history = useNavigate();
    const [formData, setFormData] = useState({
        ProductID: '',
        Name: '',
        Brand: '',
        Type: '',
        Color: '',
        Price: '',
        Category:'',
        QuantityInStock: '',
        StoreID: 1,
        ProductImage:'',
        Description:'',
        ShortDescription:''
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Успешно создан новый товар
                console.log('Успешно создан новый товар');
                console.log(JSON.stringify(formData))
                history('/');
            } else {
                // Обработка ошибок
                console.error('Ошибка при создании товара');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };
    return(
        <>
            <form onSubmit={handleSubmit} className={"signUpForm"}>
                <label>
                    <input type="text" name="Name" value={formData.Name} onChange={handleChange} required className={"formInput"} placeholder={"Имя товара"}  />
                </label>
                <label>
                    <input type="text" name="Brand" value={formData.Brand} onChange={handleChange} required className={"formInput"} placeholder={"Бренд"} />
                </label>
                <label>
                    <input type="text"  name="Type" value={formData.Type} onChange={handleChange} required className={"formInput"} placeholder={"Тип товара"}  />
                </label>
                <label>
                    <input type="text" name="Color" value={formData.Color} onChange={handleChange} required className={"formInput"} placeholder={"Цвет"}   />
                </label>
                <label>
                    <input type="number" name="Price" value={formData.Price} onChange={handleChange} required className={"formInput"} placeholder={"Цена"}  />
                </label>
                <label>
                    <input type="number" name="QuantityInStock" value={formData.QuantityInStock} onChange={handleChange} required  className={"formInput"} minLength={8} placeholder={"Количество на складе"}  />
                </label>
                <label>
                    <input type="text" name="Category" value={formData.Category} onChange={handleChange} required  className={"formInput"} minLength={8} placeholder={"Категория"}  />
                </label>
                <label>
                    <input type="text" name="ProductImage" value={formData.ProductImage} onChange={handleChange} required  className={"formInput"} placeholder={"Путь картинки"}  />
                </label>
                <label>
                    <input type="text" name="Description" value={formData.Description} onChange={handleChange} required  className={"formInput"} minLength={15} maxLength={1000} placeholder={"Большое описание"}  />
                </label>
                <label>
                    <input type="text" name="ShortDescription" value={formData.ShortDescription} onChange={handleChange} required  className={"formInput"} minLength={15} maxLength={100} placeholder={"Короткое описание"}  />
                </label>
                <button type="submit" className={"submitButton"}>Добавить товар</button>
            </form>
        </>
    )
}
export default AddNewProduct