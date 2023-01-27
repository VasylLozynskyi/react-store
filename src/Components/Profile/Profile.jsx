import { signOut } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import style from "./profile.module.scss"

export const Profile = (props) =>{
    console.log(props.userdata);
    const [isdata, setisdata]=useState({});
    const [name, setName]=useState(props.userdata.name)
    useEffect(()=>{
        setisdata(props.userdata)
    }, [props.userdata])
    const navigate = useNavigate();
if (isdata.uid === undefined){
    const handleLogin =() =>{
        props.toLogin({display: "block"})
    }
return (
    <div className={style.enterlogin}>
        <h2>Please Login to your profile</h2>
        <br />
        <button onClick={handleLogin}>Login</button>
    </div>
)
} else { 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
            props.show_login_after_logout({display: "block"});
        }).catch((error) => {
        console.log(error.message);
        });
    }
    const handleChange = () => {
        console.log("change name");
    }
    return(
        <div className={style.profile}>
            <div className={style.infouser}>
                <h2>Hello, {name}</h2>
                <input type="text" placeholder={name} id="name" value={name} />
                <button onClick={handleChange}>change</button>
                <p>email : {props.userdata.email}</p>
            </div>
            <br />
            <div>
        		<button className={style.btn_logout} onClick={handleLogout}>
                    Logout
                </button>
        	</div>
        </div>
    )
}
}