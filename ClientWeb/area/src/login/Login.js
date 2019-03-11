import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import O2Connexion from './O2Connexion'
import "../App.css"
import Axios from 'axios'
import {connect} from "react-redux";
import AreaLogo from '../ressources/arealogo.png'

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            test: '',
            url: 'http://localhost:3000/api/users/login?',
            token: '',
            isLog: false,
            id: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
        this.admin = this.admin.bind(this);
        this.setToken = this.setToken.bind(this);
        this.setId = this.setId.bind(this);
    }

    setId(e) {
        const action = { type: "SET_ID", value: this.state.id }
        this.props.dispatch(action)
        console.log("STEP2")
        console.log(this.props.myId);
    }

    setToken(e) {
        const action = { type: "SET_TOKEN", value: this.state.token }
        this.props.dispatch(action)
    }

    admin(e) {
        const action = { type: "IS_ADMIN", value: this.state.token }
        this.props.dispatch(action)
    }

    changePage(e) {
        this.props.history.push('/introduction')
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

        if (this.state.email === "" || this.state.password === "") {
            console.log("Email or password is empty");
        } else if (this.state.isLog === false) {
            const query = this.state.url + "email=" + this.state.email + "&password=" + this.state.password;
            Axios({
                method: 'post',
                url: query,
                timeout: 8000, // Let's say you want to wait at least 8 seconds
            })
                .then((response) => {
                    console.log(response.data)
                    this.setState({token: response.data.token});
                    this.setState({id: response.data.user.id});
                    this.setId();
                    this.setToken();
                    if (response.data.user.admin === true) {
                        this.admin();
                    }
                    this.changePage();
                })
                .catch((error) => {
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
                    </div>
                    <div className="FormCenter">
                        <form onSubmit={this.handleSubmit} className="FormFields">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                                <input type="email" id="email" className="FormField__Input"
                                       placeholder="Enter your email" name="email" value={this.state.email}
                                       onChange={this.handleChange}/>
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password">Password</label>
                                <input type="password" id="password" className="FormField__Input"
                                       placeholder="Enter your password" name="password" value={this.state.password}
                                       onChange={this.handleChange}/>
                            </div>

                            <O2Connexion arg={this.props}/>

                            <div className="FormField">
                                <button className="FormField__Button mr-20" onClick={this.handleSubmit}>Login In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.isAdmin,
        myToken: state.myToken,
        myId: state.myId
    }
}
export default connect(mapStateToProps)(Login)

