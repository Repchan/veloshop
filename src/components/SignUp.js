import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const SignUp = (props)=>{
    const history = useNavigate();
    const [formData, setFormData] = useState({
        Username: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Address: '',
        Phone: '',
        Password: '',
        Role: 'User',
        IsBlocked:false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const searchSimilar = async () => {
        try {
            const responseUsername = await fetch(`http://localhost:3000/users/search/${formData.Username}`);
            if (responseUsername.ok) {
                alert("Имя пользователя существует");
                return true; // Пользователь существует
            }
            const responseEmail = await fetch(`http://localhost:3000/users/search/${formData.Email}`)
            if(responseEmail.ok){
                alert("Такая почта уже существует")
                return true;
            }
            const responsePhone = await fetch(`http://localhost:3000/users/search/${formData.Phone}`);
            if(responsePhone.ok){
                alert("Такой телефон уже существует");
                return true
            }
            return false
        }
        catch(error) {
            return false; // Ошибка при запросе
        }
    }
    const validator = ()=>{
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const TelRegExp = /^(\+38)?\s?0\d{9}$/;
        if(!EMAIL_REGEXP.test(String(formData.Email).toLowerCase())){
            console.log(formData.Email);
            console.log()
            alert("Неверный формат почты")
            return true;
        }
        if(!TelRegExp.test(String(formData.Phone).toLowerCase())){
            alert("Неверный телефон")
            return true
        }
        return false

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validatorForm = await validator();
        const userExists = await searchSimilar();
        if(validatorForm){
            return;
        }
        if (userExists) {
            // Прекратить выполнение, так как пользователь существует
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Успешно создан новый пользователь
                console.log('Пользователь успешно создан');
                history('/');
            } else {
                // Обработка ошибок
                console.error('Ошибка при создании пользователя');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={"signUpForm"}>
            <label>
                <input type="text" name="Username" value={formData.Username} onChange={handleChange} required className={"formInput"} placeholder={"Логін"} />
            </label>
            <label>
                <input type="text" name="FirstName" value={formData.FirstName} onChange={handleChange} required className={"formInput"} placeholder={"Ваше ім`я"}  />
            </label>
            <label>
                <input type="text" name="LastName" value={formData.LastName} onChange={handleChange} required className={"formInput"} placeholder={"Ваше Призвище"} />
            </label>
            <label>
                <input type="text" inputMode={"email"} name="Email" value={formData.Email} onChange={handleChange} required className={"formInput"} placeholder={"Email"}  />
            </label>
            <label>
                <input type="text" name="Address" value={formData.Address} onChange={handleChange} required className={"formInput"} placeholder={"Адресса"}   />
            </label>
            <label>
                <input type="tel" inputMode={"tel"} name="Phone" value={formData.Phone} onChange={handleChange} required className={"formInput"} placeholder={"Телефон"}  />
            </label>
            <label>
                <input type="password" name="Password" value={formData.Password} onChange={handleChange} required  className={"formInput"} minLength={8} placeholder={"Пароль"}  />
            </label>
            <button type="submit" className={"submitButton"}>Зареєструватися</button>
        </form>
    );
}
export default SignUp