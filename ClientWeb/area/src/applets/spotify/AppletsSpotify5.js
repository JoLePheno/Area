import React, {Component} from 'react';
import "../../App.css"
import {connect} from "react-redux";
import {Card, CardTitle, CardActions, Textfield,Cell, Grid, Icon, Switch} from 'react-mdl';
import Axios from "axios";

class AppletsSpotify5 extends Component {
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
        console.log("channel = ")
        Axios({
            method: 'post',
            url: query,
            timeout: 8000, // Let's say you want to wait at least 8 seconds
            headers: {
                Authorization: `Bearer ${this.props.myToken}`,
                'Content-Type': 'application/json',
            },
            data: {
                "service_name": "spotify",
                "access_token": "BQDHZ-zyWMpCa0QtquQZBe4ZgbSo-lAvSvGSSEthPi2aSTd9bKCFqOsjgGcMWigK6yGJSASk6vkKmURgR0vZJ8jXYxXE4XDki_-4vK7-nDjOnMPnqAP5KjqWvMozdBsXF_Aqa2CvxTU1Uod2tUnk6bCjtFyTIZRK60ZezqGdm9H-Sr0rwrouIw6pz0uG_Sw20fbM54A9kiUHXdH7KpCynxtyR5HZBg",
                "area": {
                    "name": "SpotifySendDailyEmail"
                }
            }
        })
            .then(function (response) {
                console.log("success")
                console.log(response.data.id);
                const action = { type: "SPOTIFY5", value: response.data.id }
                self.props.dispatch(action)
            })
            .catch((error) => {
                console.log("error")
                console.log(error)
            });
    }

    removeApplets(e) {
        const query = "http://localhost:3000/api/areas/" + this.props.AppletsSpotify5Id;
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
        if (this.props.switchValue.spotifyApplets5 === true) {
            this.removeApplets()
        } else {
            this.addApplets()
        }
    }

    render() {
        return (
            <div>
                <Card shadow={0} style={{width: '100%', height: '7%', background: '#1ED760'}}>
                    <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                        <h6 style={{marginTop: '0'}}>
                            <br/> Featured event: Create a new playlist with the best song <br/>
                            Detail: Create playlist and add 5 top tracks of the artist you just followed<br/>
                        </h6>
                    </CardTitle>
                    <CardActions border style={{
                        borderColor: 'rgba(1, 0, 0, 0.2)',
                        display: 'flex',
                        boxSizing: 'border-box',
                        alignItems: 'center',
                        color: '#fff'
                    }}>
                        <Switch checked={this.props.switchValue.spotifyApplets5} ripple id="spotifyApplets5"
                                onChange={this._handleChange}>Turn On/Off</Switch>
                        <div className="mdl-layout-spacer"></div>
                        <Icon name="Spotify"/>
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
        AppletsSpotify5Id: state.AppletsSpotify5Id
    }
}
export default connect(mapStateToProps)(AppletsSpotify5)
