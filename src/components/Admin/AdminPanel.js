import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import responseToLocal from "../../functions/ResponseToLocal";

const AdminPanel = (props) =>{
    const [role,setRole] = useState({role:''})
    useEffect(()=>{
        const checkLocalData = async ()=>{
            const data = await responseToLocal();
            if(data!== undefined){
                setRole({role:data.Role})
            }
        }
        checkLocalData()
    })
    return(
        <div>
            {role.role !== 'Admin'?
                <p>Нет доступа</p>
                :
                <div>
                    <h1>Панель админа</h1>
                    <h2>Список функций</h2>
                    <ul>
                        <li><Link to={'/admin/addnewproduct'}>Добавление нового товара</Link></li>
                        <li>Удаление товара</li>
                        <li>Просмотр заказов</li>
                        <li>Просмотр пользователей</li>
                    </ul>
                </div>}
        </div>
    )
}
export default AdminPanel