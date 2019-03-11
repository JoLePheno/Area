import React, {Component} from 'react';
import Axios from 'axios'
import {Link, NavLink} from 'react-router-dom';
import O2Connexion from "./O2Connexion";
import AreaLogo from "../ressources/arealogo.png";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.email === "" || this.state.password === "" || this.state.name === "") {
            alert("Email or password or name is empty");
        } else {
            Axios({
                method: 'post',
                url: 'http://localhost:3000/api/users',
                timeout: 8000, // Let's say you want to wait at least 8 seconds
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type': 'application/json'
                },
                data: {
                    "email": this.state.email,
                    "password": this.state.password,
                    "services": []
                }
            })
                .then(function (response) {
                    alert("Success, please confirm your mail and log in");
                })
                .catch((error) => {
                    alert("Error");
                });
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App__Aside">
                    <img className="LogoImage" src={AreaLogo} />
                </div>
                <div className="App__Form">
                    <div className="PageSwitcher">
                        <NavLink to="/login" activeClassName="PageSwitcher__Item--Active"
                                 className="PageSwitcher__Item">Log In</NavLink>
                        <NavLink exact to="/register" activeClassName="PageSwitcher__Item--Active"
                                 className="PageSwitcher__Item">Register</NavLink>
                    </div>

                    <div className="FormTitle">
                        <NavLink to="/login" activeClassName="FormTitle__Link--Active"
                                 className="FormTitle__Link">Login</NavLink> or <NavLink exact to="/register"
                                                                                         activeClassName="FormTitle__Link--Active"
                                                                                         className="FormTitle__Link">Register</NavLink>
                        <div className="FormCenter">
                            <form onSubmit={this.handleSubmit} className="FormFields">
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="name">Full Name</label>
                                    <input type="text" id="name" className="FormField__Input"
                                           placeholder="Enter your full name" name="name" value={this.state.name}
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="password">Password</label>
                                    <input type="password" id="password" className="FormField__Input"
                                           placeholder="Enter your password" name="password" value={this.state.password}
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                                    <input type="email" id="email" className="FormField__Input"
                                           placeholder="Enter your email" name="email" value={this.state.email}
                                           onChange={this.handleChange}/>
                                </div>

                                <O2Connexion/>

                                <div className="FormField">
                                    <button className="FormField__Button mr-20" onClick={this.handleSubmit}>Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
