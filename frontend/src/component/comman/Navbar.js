import React, {useEffect, useState} from "react";
import {Link, NavLink, useParams} from 'react-router-dom';

const Navbar = () => {
    let {id} = useParams();
    id = id ? id : JSON.parse(localStorage.getItem('userId'));
    const [userData, setUserdata] = useState({});

    useEffect(() => {
        const users = localStorage.getItem("userData")
        setUserdata(users);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
            <div className="container ">

                <div className="collapse navbar-collapse navbar-expand-md">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#collapsenavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsenavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to={`/home/${id}`}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to={`/profile/${id}`}>
                                    Profile
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <Link className="btn btn-outline-light" to="/register">Register</Link>
                </div>
            </div>
        </nav>
    )
}


export default Navbar;