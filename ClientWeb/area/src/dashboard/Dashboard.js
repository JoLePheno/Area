import React, {Component} from 'react';
import Navbar from '../utility/Navbar'
import "../App.css"
import {connect} from "react-redux";
import {Tabs, Tab} from 'react-mdl';
import AffServices from '../services/AffServices'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
        };
    }


    render() {
        return (
            <div>
                <Navbar arg={this.props}/>
                <div className="demo-tabs">
                    <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                        <Tab>All Services</Tab>
                        <Tab>My Turn On Services</Tab>
                    </Tabs>
                    <section>
                        <div className="content">
                            <p className="center">You can selected the service you want to use on the "Select Service" page</p>
                            { this.state.activeTab === 0 ? <AffServices/> : null}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: state.services,
        servicesToString: state.servicesToString,
    }
}
export default connect(mapStateToProps)(Dashboard)
