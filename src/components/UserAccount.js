import React, { useState, useEffect } from 'react';
import responseToLocal from "../functions/ResponseToLocal";
import {BrowserRouter as Router, Routes, Route, Link, redirect} from 'react-router-dom';

const UserAccount = (props) => {
    const [username , setUsername] = useState({name:""})
    const [role,setRole] = useState({role:''})
    useEffect(()=>{
        const checkLocalData = async ()=>{
            const data = await responseToLocal();
            if(data!== undefined){
                setUsername({name:data.login});
                setRole({role:data.Role})
            }
            else setUsername("")

        }
        checkLocalData()
    })
    const handleClickExit = () =>{
        localStorage.removeItem("authData");
        window.location.reload()
    }



    return (
        <div>
                <div className={'userAuth'}>
                    <p><Link to={role.role === 'Admin'?'/admin':"/user"}>{username.name}</Link></p>
                    <p onClick={handleClickExit} className={"exit"}><Link to={`/signIn`}>Выйти</Link></p>
                </div>
        </div>
    );
};
export default UserAccount