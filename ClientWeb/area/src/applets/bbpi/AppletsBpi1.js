import React, {Component} from 'react';
import "../../App.css"
import {connect} from "react-redux";
import {Card, CardTitle, CardActions, Checkbox ,Cell, Grid, Icon, Switch} from 'react-mdl';
import Axios from "axios";

class AppletsBpi1 extends Component {
    constructor() {
        super();


        this.state = {
            value: ""
        };
        this._handleChange = this._handleChange.bind(this);
        this.removeApplets = this.removeApplets.bind(this);
        this.addApplets = this.addApplets.bind(this);
        this.eur = this.eur.bind(this);
        this.usd = this.usd.bind(this);
        this.gbp = this.gbp.bind(this);
    }

    eur(e) {
        console.log(e)
        this.setState({value: "EUR"});
    }

    usd(e) {
        console.log(e)
        this.setState({value: "USD"});
    }

    gbp(e) {
        console.log(e)
        this.setState({value: "GBP"});
    }

    addApplets(e) {
        var self = this;
        const query = "http://localhost:3000/api/areas";
        Axios({
            method: 'post',
            url: query,
            timeout: 8000, // Let's say you want to wait at least 8 seconds
            headers: {
                Authorization: `Bearer ${this.props.myToken}`,
                'Content-Type': 'application/json',
            },
            data: {
                "service_name": "bpi",
                "area": {
                    "name": "Bpi",
                    "params": [this.state.value],
                }
            }
        })
            .then(function (response) {
                console.log("success")
                console.log(response.data.id);
                const action = { type: "BPI", value: response.data.id }
                self.props.dispatch(action)
            })
            .catch((error) => {
                console.log("error")
                console.log(error)
            });
    }

    removeApplets(e) {
        const query = "http://localhost:3000/api/areas/" + this.props.AppletsLol1Id;
        console.log("query = " + query)
        Axios({
            baseURL: query,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.props.myToken}`
            }
        })
            .then((response) => {
                console.log("OK")
            })
            .catch((error) => {
                alert("NON")
            });
    }

    _handleChange(e) {
        const actionAff = { type: "APPLETS", value: e.target.id }
        this.props.dispatch(actionAff)
        if (this.props.switchValue.lolApplets1 === true) {
            this.removeApplets()
        } else {
            this.addApplets()
        }
    }

    render() {
        return (
            <div>
                <Card shadow={0} style={{width: '100%', height: '7%', background: '#F7941D'}}>
                    <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                        <h6 style={{marginTop: '0'}}>
                            <br/> Featured event: Receive a mail <br/>
                            Detail: Notify when bitcoins price change<br/>
                        </h6>
                    </CardTitle>
                    <CardActions border style={{
                        borderColor: 'rgba(1, 0, 0, 0.2)',
                        display: 'flex',
                        boxSizing: 'border-box',
                        alignItems: 'center',
                        color: '#fff'
                    }}>
                        <div className="goLeft">
                            <Checkbox onChange={this.usd} label="USD" />
                            <Checkbox onChange={this.gbp} label="GBP" />
                            <Checkbox onChange={this.eur} label="EUR" />
                        </div>
                        <Switch checked={this.props.switchValue.bpiApplets1} ripple id="bpiApplets1" onChange={this._handleChange}>Turn On/Off</Switch>
                        <div className="mdl-layout-spacer"></div>
                        <Icon name="Bpi"/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: state.services,
        switchValue: state.switchValue,
        myToken: state.myToken,
        AppletsBpi1Id: state.AppletsBpi1Id
    }
}
export default connect(mapStateToProps)(AppletsBpi1)
