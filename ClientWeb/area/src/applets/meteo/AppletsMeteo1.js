import React, {Component} from 'react';
import "../../App.css"
import {connect} from "react-redux";
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch, Textfield} from 'react-mdl';
import Axios from "axios";

class AppletsMeteo1 extends Component {
    constructor() {
        super();

        this.state = {
            id: '',
            lattitude: '',
            longitude: ''
        };

        this._handleChange = this._handleChange.bind(this);
        this.removeApplets = this.removeApplets.bind(this);
        this.addApplets = this.addApplets.bind(this);
        this.addLattitude = this.addLattitude.bind(this);
        this.addLongitude = this.addLongitude.bind(this);
    }


    addLattitude(e) {
        console.log("LATTITUDE")
        e.preventDefault();
        let target = e.target;
        console.log(target.value)
        this.setState({lattitude: target.value});
    }

    addLongitude(e) {
        console.log("LONGITUDE")
        e.preventDefault();
        let target = e.target;
        console.log(target.value)
        this.setState({longitude: target.value});
    }

    addApplets(e) {
        console.log("step1")
        var self = this;
        console.log("step2")
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
                "service_name": "weather",
                "area": {
                    "name": "Sunset",
                    "params": [this.state.lattitude, this.state.longitude]
                }
            }
        })
            .then(function (response) {
                console.log("success")
                console.log(response.data.id);
                const action = { type: "METEO", value: response.data.id }
                self.props.dispatch(action)
            })
            .catch((error) => {
                console.log("error")
                console.log(error)
                console.log(this.state.lattitude)
                console.log(this.state.longitude)

            });
    }

    removeApplets(e) {
        const query = "http://localhost:3000/api/areas/" + this.props.AppletsMeteo1Id;
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
        if (this.props.switchValue.meteoApplets1 === true) {
            this.removeApplets()
        } else {
            this.addApplets()
        }
    }

    render() {
        return (
            <div>
                <Card shadow={0} style={{width: '100%', height: '7%', background: '#FFCC33'}}>
                    <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                        <h6 style={{marginTop: '0'}}>
                            <br/> Featured event: Receive a mail <br/>
                            Detail: Notify when the sunset come<br/>
                        </h6>
                    </CardTitle>
                    <Textfield
                        onChange={this.addLattitude}
                        label="Lattitude"
                        floatingLabel
                        style={{width: '200px'}}
                    />
                    <Textfield
                        onChange={this.addLongitude}
                        label="Longitude"
                        floatingLabel
                        style={{width: '200px'}}
                    />
                    <CardActions border style={{
                        borderColor: 'rgba(1, 0, 0, 0.2)',
                        display: 'flex',
                        boxSizing: 'border-box',
                        alignItems: 'center',
                        color: '#fff'
                    }}>
                        <Switch checked={this.props.switchValue.meteoApplets1} ripple id="meteoApplets1" onChange={this._handleChange}>Turn On/Off</Switch>
                        <div className="mdl-layout-spacer"></div>
                        <Icon name="Meteo"/>
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
        AppletsMeteo1Id: state.AppletsMeteo1Id,
        meteoApplets1: state.meteoApplets1
    }
}
export default connect(mapStateToProps)(AppletsMeteo1)
