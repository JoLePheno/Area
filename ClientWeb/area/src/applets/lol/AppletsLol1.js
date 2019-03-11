import React, {Component} from 'react';
import "../../App.css"
import {connect} from "react-redux";
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch} from 'react-mdl';
import Axios from "axios";

class AppletsLol1 extends Component {
    constructor() {
        super();

        this.state = {
            id: ''
        };

        this._handleChange = this._handleChange.bind(this);
        this.removeApplets = this.removeApplets.bind(this);
        this.addApplets = this.addApplets.bind(this);
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
                "service_name": "lol",
                "area": {
                    "name": "ChampionsRotation",
                    "params": []
                }
            }
        })
            .then(function (response) {
                console.log("success")
                console.log(response.data.id);
                const action = { type: "LOL", value: response.data.id }
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
                <Card shadow={0} style={{width: '100%', height: '7%', background: '#C58816'}}>
                    <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                        <h6 style={{marginTop: '0'}}>
                            <br/> Featured event: Receive a mail <br/>
                            Detail: Notify when new champions rotations is set<br/>
                        </h6>
                    </CardTitle>
                    <CardActions border style={{
                        borderColor: 'rgba(1, 0, 0, 0.2)',
                        display: 'flex',
                        boxSizing: 'border-box',
                        alignItems: 'center',
                        color: '#fff'
                    }}>
                        <Switch checked={this.props.switchValue.lolApplets1} ripple id="lolApplets1" onChange={this._handleChange}>Turn On/Off</Switch>
                        <div className="mdl-layout-spacer"></div>
                        <Icon name="Lol"/>
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
        AppletsLol1Id: state.AppletsLol1Id
    }
}
export default connect(mapStateToProps)(AppletsLol1)
