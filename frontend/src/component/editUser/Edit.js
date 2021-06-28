import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {useParams} from "react-router";

const Edit = (props) => {
    const {id} = useParams();
    const [userSecret, setSecret] = useState(null);
    const [userDetails, setUserDetails] = useState({

    });
    useEffect(() => {
        const userToken = localStorage.getItem("token");
        setSecret(userToken);
        console.log("user details from local storeg", userDetails);
        loadUser(userToken, id);
    }, []);
    const config = (userToken) => ({
        headers: {
            "Authorization": userToken,
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const loadUser = async (userToken, id) => {
        const result = await axios.get(`http://localhost:3001/user/${id}`, config(userToken));
        setUserDetails(result.data);
        console.log(result.data);
    };
    const [errors, setErrors] = useState({});
    let history = useHistory();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    };

    const validation = (name, value) => {
        switch (name) {
            case 'name':
                if (!value) {
                    return 'Name is Required';
                } else {
                    return '';
                }
            case 'email':
                if (!value) {
                    return 'Email is required';
                } else {
                    return '';
                }
            case 'contact':
                if (!value) {
                    return 'Please fill up this fild';
                } else {
                    return '';
                }
            default: {
                return ''
            }
        }
    };


    const handleSubmit = async () => {
        console.log("------>")
        // event.preventDefault();
        let validationErrors = {};
        Object.keys(userDetails).forEach(name => {
            const error = validation(name, userDetails[name]);

            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return true;
        }
        console.log("okk")
        const userId = JSON.parse(localStorage.getItem("userId"));
        const userToken = localStorage.getItem("token");
        await axios.put(`http://localhost:3001/editUser/${id}`,
            userDetails,
            {headers: {'Authorization': userToken}},)
            .then(res => {
                console.log("log in then")
                console.log("userDetils after edited data submit-->", userDetails)

                if (!res.data) {
                    return;
                } else {
                    if (res.status === 200) {
                        // localStorage.setItem("user",JSON.stringify(res.data));
                        console.log("res after submit data -->", res.data)
                        history.push(`/profile/${id}`);
                    }
                    if (res.status === 404) {

                    }
                }
            })
            .catch(error => {
                console.log("catch error", error)
            })

        // if (error1 && error1.length > 0) {
        //     validationErrors[name] = error;
        // }
    };

    return (
        <div className="container">
            <h3>Edit Profile</h3>

            <div className="form-group">
                <label>First Name</label>
                <input type="text"
                       className="form-control"
                       name="firstName"
                       value={userDetails.firstName || ""}
                       placeholder="Name" onChange={handleChange}/>
                <p className="text-danger">{errors.firstName}</p>
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input type="text"
                       className="form-control"
                       name="lastName"
                       value={userDetails.lastName || ""}
                       placeholder="Name" onChange={handleChange}/>
                <p className="text-danger">{errors.lastName}</p>
            </div>

            <div className="form-group">
                <label>Date Of Birth</label>
                <input type="date"
                       className="form-control"
                       name="dateOfBirth"
                       value={userDetails.dateOfBirth || ""}
                       placeholder="Date Of Birth"
                       onChange={handleChange}/>
                <p className="text-danger">{errors.dateOfBirth}</p>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email"
                       className="form-control"
                       name="email" value={userDetails.email || ""}
                       placeholder="Enter email"
                       onChange={handleChange}/>
                <p className="text-danger">{errors.email}</p>
            </div>

            <div className="form-group">
                <label>Mobile Number</label>
                <input type="text"
                       className="form-control"
                       name="contact" value={userDetails.contact || ""}
                       placeholder="Enter Mobile Number"
                       onChange={handleChange}/>
                <p className="text-danger">{errors.contact}</p>
            </div>

            {/*<div className="form-group">*/}
            {/*    <label>Password</label>*/}
            {/*    <input type="password"*/}
            {/*           className="form-control"*/}
            {/*           name="password"*/}
            {/*           value={userDetails.password || ""}*/}
            {/*           placeholder="Enter password"*/}
            {/*           onChange={handleChange}/>*/}
            {/*    <p className="text-danger">{errors.password}</p>*/}
            {/*</div>*/}

            {/*<div className="form-group">*/}
            {/*    <label>Conform Password</label>*/}
            {/*    <input type="password"*/}
            {/*           className="form-control"*/}
            {/*           name="conformPassword"*/}
            {/*           value={userDetails.conformPassword || ""}*/}
            {/*           placeholder="Confirm password"*/}
            {/*           onChange={handleChange}/>*/}
            {/*    <p className="text-danger">{errors.conformPassword}</p>*/}
            {/*</div>*/}

            <button onClick={handleSubmit} className="btn btn-dark btn-lg btn-block">Submit</button>
        </div>
    );
};

export default Edit;