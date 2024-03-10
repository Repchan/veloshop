import React, { useState, useEffect } from 'react';
import responseToLocal from "../functions/ResponseToLocal";
import { useNavigate } from 'react-router-dom';
const LogIn = (props)=> {
    const history = useNavigate();
    const [formData, setData] = useState({
        Username: '',
        Password: ''
    })
    const [authorized ,setAuthorized] = useState(false)
    useEffect(() => {
        const checkLocalData = async () => {
            const localData = await responseToLocal();
            if(localData!==undefined){
                setAuthorized(true);
            }
        };
        checkLocalData();
    }, []);
    const handleChange = (e) => {
        setData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit =  (e) => {
        e.preventDefault();

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/search/${formData.Username}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.Password === formData.Password) {
                        const authData = {login:formData.Username,password:formData.Password,auth:true,customerID:data.UserID,Role:data.Role};
                        localStorage.setItem("authData",JSON.stringify(authData));
                        setAuthorized(true)

                    } else {
                        return console.log("Неверный пароль")
                    }
                } if(response.status === 404){
                    alert("Такого пользователя не существует");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }

        }
        fetchData();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
        return (
            <div>
                {authorized === false?(
                    <form className={"logInForm"} onSubmit={handleSubmit}>
                    <label>

                        <input type="text" name="Username" className={"formInput"} value={formData.Username} onChange={handleChange} placeholder={"Ваш логін"} required />
                    </label>
                    <label>

                        <input type="text" name="Password" className={"formInput"} value={formData.Password} onChange={handleChange} placeholder={"Ваш пароль"}  required />
                    </label>

                    <button type="submit" className={"submitButton"}>Войти</button>
                </form>

                    ):(
                        <div className={"qwe"}>
                            <p>Вход успешно выполнен</p>
                        </div>
                )}
            </div>
        )
}
export default LogIn