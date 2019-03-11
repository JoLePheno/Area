import React, { Component } from 'react';
import { Layout, Header, Navigation, Content } from 'react-mdl';
import { Introduction } from "../dashboard/Introduction"
import { Homepage } from "../login/Login"
import {connect} from "react-redux";
import Register from "../login/Register";

class Navbar extends Component {
    constructor() {
        super();

        this.admin = this.admin.bind(this);
        this.dashboard = this.dashboard.bind(this);
        this.selectService = this.selectService.bind(this);
        this.logout = this.logout.bind(this);
    }

    selectService(e) {
        e.preventDefault();
        this.props.arg.history.push({
            pathname: '/introduction',
            state: { arg: this.props.arg }
        })
    }

    admin(e) {
        e.preventDefault();
        console.log("ok")
        this.props.arg.history.push({
            pathname: '/admin',
            state: {arg: this.props.arg}
        })
    }

    dashboard(e) {
        e.preventDefault();
        this.props.arg.history.push({
            pathname: '/dashboard',
            state: { arg: this.props.arg }
        })
    }

    logout(e) {
        this.props.arg.history.push({
            pathname: '/',
            state: { arg: this.props.arg }
        })
    }

    render() {
        return (
            <div style={{height: '100px', position: 'relative'}}>
                <Layout fixedHeader fixedTabs>
                    <Header title={<span><span style={{ color: '#ddd' }}>Area</span></span>}>
                        <Navigation>
                            <a onClick={this.selectService}>Select Service</a>
                            <a onClick={this.dashboard}>Home Page</a>
                            {this.props.arg.isAdmin === true ? <a onClick={this.admin}>Admin</a> : null}
                            <a onClick={this.logout}>Log out</a>
                        </Navigation>
                    </Header>
                    <Content />
                </Layout>
            </div>
        );
    }
}

export default Navbar;
