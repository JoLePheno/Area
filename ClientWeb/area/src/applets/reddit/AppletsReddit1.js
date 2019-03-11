import React, {Component} from 'react';
import "../../App.css"
import {connect} from "react-redux";
import {Card, CardTitle, CardActions, Textfield,Cell, Grid, Icon, Switch} from 'react-mdl';
import Axios from "axios";

class AppletsReddit1 extends Component {
    constructor() {
        super();

        this.state = {
            id: '',
            channel: ''
        };

        this._handleChange = this._handleChange.bind(this);
        this.removeApplets = this.removeApplets.bind(this);
        this.addApplets = this.addApplets.bind(this);
        this.addChannel = this.addChannel.bind(this);
    }

    addChannel(e) {
        e.preventDefault();
        let target = e.target;
        console.log(target.value)
        this.setState({channel: target.value});
    }


    addApplets(e) {
        var self = this;
        const query = "http://localhost:3000/api/areas";
        console.log("channel = ")
        console.log(this.state.channel);
        Axios({
            method: 'post',
            url: query,
            timeout: 8000, // Let's say you want to wait at least 8 seconds
            headers: {
                Authorization: `Bearer ${this.props.myToken}`,
                'Content-Type': 'application/json',
            },
            data: {
                "service_name": "reddit",
                "area": {
                    "name": "FollowSubReddit",
                    "params": [this.state.channel]
                }
            }
        })
            .then(function (response) {
                console.log("success")
                console.log(response.data.id);
                const action = { type: "REDDIT", value: response.data.id }
                self.props.dispatch(action)
            })
            .catch((error) => {
                console.log("error")
                console.log(error)
            });
    }

    removeApplets(e) {
        const query = "http://localhost:3000/api/areas/" + this.props.AppletsReddit1Id;
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
                console.log("NON")
                console.log(error)
                console.log(query)
            });
    }

    _handleChange(e) {
        const actionAff = { type: "APPLETS", value: e.target.id }
        this.props.dispatch(actionAff)
        if (this.props.switchValue.redditApplets1 === true) {
            this.removeApplets()
        } else {
            this.addApplets()
        }
    }

    render() {
        return (
            <div>
                <Card shadow={0} style={{width: '100%', height: '7%', background: '#FF3F18'}}>
                    <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                        <h6 style={{marginTop: '0'}}>
                            <br/> Featured event: Receive a mail <br/>
                            Detail: Notify when a new subject is open on a your favorite subreddit<br/>
                        </h6>
                        <Textfield
                            onChange={this.addChannel}
                            label="Channel to follow"
                            floatingLabel
                            style={{width: '200px'}}
                        />
                    </CardTitle>
                    <CardActions border style={{
                        borderColor: 'rgba(1, 0, 0, 0.2)',
                        display: 'flex',
                        boxSizing: 'border-box',
                        alignItems: 'center',
                        color: '#fff'
                    }}>
                        <Switch checked={this.props.switchValue.redditApplets1} ripple id="redditApplets1"
                                onChange={this._handleChange}>Turn On/Off</Switch>
                        <div className="mdl-layout-spacer"></div>
                        <Icon name="Reddit"/>
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
        AppletsReddit1Id: state.AppletsReddit1Id
    }
}
export default connect(mapStateToProps)(AppletsReddit1)
