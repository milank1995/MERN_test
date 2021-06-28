import React, {useEffect, useState} from "react";
import profilePic from "../../assert/images/team2.jpg";
import "../profile/Profile.scss";
import {useParams} from "react-router";
import axios from "axios";

const Profile = () => {
    const { id } = useParams();
    const [user,setUser] = useState({
        contact:"",
        name:"",
        email:""
    })
    const { name,  email, contact} = user;
    useEffect(()=>{
        loadUser()
    },[]);

    const  loadUser = async () => {
        const result = await axios.get(`http://localhost:3001/user/${id}`);
        setUser(result.data);
    }
    return (
        <div className="container profile">
            <h2>User Profile Card</h2>

            <div className="card">
                <img src={profilePic} alt="John"/>
                    <h1>{user.name}</h1>
                    <p className="title">contect no: {user.contact}</p>
                <a href = "mailto: abc@example.com">{user.email}</a>
                    <div className="profile-data">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <label> {user.contact}</label>
                            </div>
                        </div>
                    </div>
                    <p><button>Contact</button></p>
            </div>
        </div>
    )
}

export default Profile;