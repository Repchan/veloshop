import React, { useState, useEffect } from 'react';
import responseToLocal from "../functions/ResponseToLocal";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const UserAccount = (props) => {
    const [username , setUsername] = useState({name:""})
    useEffect(()=>{
        const checkLocalData = async ()=>{
            const data = await responseToLocal();
            if(data!== undefined){
                setUsername({name:data.login});
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
                    <p>{username.name}</p>
                    <p onClick={handleClickExit} className={"exit"}>Выйти</p>
                </div>
        </div>
    );
};
export default UserAccount