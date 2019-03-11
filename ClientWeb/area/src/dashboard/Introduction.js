import React, {Component} from 'react';
import Navbar from '../utility/Navbar'
import {Card, CardTitle, CardText, CardActions, Button, Cell, Grid} from 'react-mdl';
import "../App.css"
import { connect } from 'react-redux'
import Axios from "axios";

class Introduction extends Component {
    constructor() {
        super();

        this.state = {
        };

        this._addService = this._addService.bind(this);
        this._create = this._create.bind(this);
    }

    _create(e){
        console.log(this.props.myToken);
        const query = "http://localhost:3000/api/services"
       Axios({
            method: 'post',
            url: query,
            timeout: 8000, // Let's say you want to wait at least 8 seconds
            headers: {
                Authorization: `Bearer ${this.props.myToken}`,
                'Content-Type': 'application/json',
            },
            data: {
                "name": e,
                "areas": []
            }
        })
            .then(function (response) {
            })
            .catch((error) => {
                console.log("error")
            });
    }

    _addService(e) {
        const action = { type: "ADD_SERVICE", value: e.target.value }
        this.props.dispatch(action)
        const actionAff = { type: "AFF_SERVICES", value: e.target.value }
        this.props.dispatch(actionAff)
        if (e.target.value === "steam" && this.props.createSteam === false) {
            this._create("steam");
            const actionAff = { type: "CREATE_STEAM", value: true }
            this.props.dispatch(actionAff)
        } else if(e.target.value === "lol" && this.props.createLol === false) {
            this._create("lol");
            const actionAff = { type: "CREATE_LOL", value: true }
            this.props.dispatch(actionAff)
        } else if(e.target.value === "reddit" && this.props.createReddit === false) {
            this._create("reddit");
            const actionAff = { type: "CREATE_REDDIT", value: true }
            this.props.dispatch(actionAff)
        } else if(e.target.value === "spotify" && this.props.createSpotify === false) {
             this._create("spotify");
            const actionAff = { type: "CREATE_SPOTIFY", value: true }
            this.props.dispatch(actionAff)
        } else if(e.target.value === "bpi" && this.props.createBpi === false) {
            this._create("bpi");
            const actionAff = { type: "CREATE_BPI", value: true }
            this.props.dispatch(actionAff)
        } else if(e.target.value === "meteo" && this.props.createMeteo === false) {
            this._create("weather");
            const actionAff = { type: "CREATE_METEO", value: true }
            this.props.dispatch(actionAff)
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Navbar arg={this.props}/>
                <div className="center">
                    <h5 className="text">To help you get personalized recommendations, pick at least 3 of the following that you use
                        regularly :).</h5>
                    <p>Your selected services are: {this.state.selection} </p>
                    <p> {this.props.servicesToString} </p>
                </div>
                <div style={{width: '80%', margin: 'auto'}}>
                    <Grid className="demo-grid-1">
                        <Cell col={4}>
                            <Card shadow={0} style={{width: '320px', height: '320px', margin: 'auto'}}>
                                <CardTitle className="lol" expand>
                                    <button onClick={this._addService} value={"lol"} className="addService">
                                    </button>
                                </CardTitle>
                            </Card>
                        </Cell>
                        <Cell col={4}>
                            <Card shadow={0} style={{width: '320px', height: '320px', margin: 'auto'}}>
                                <CardTitle className="meteo" expand>
                                    <button onClick={this._addService} value={"meteo"} className="addService">
                                    </button>
                                </CardTitle>
                            </Card>
                        </Cell>
                    </Grid>
                    <Grid className="demo-grid-1">
                        <Cell col={4}>
                            <Card shadow={0} style={{width: '320px', height: '320px', margin: 'auto'}}>
                                <CardTitle className="spotify" expand>
                                    <button onClick={this._addService} value={"spotify"} className="addService">
                                    </button>
                                </CardTitle>
                            </Card>
                        </Cell>
                        <Cell col={4}>
                            <Card shadow={0} style={{width: '320px', height: '320px', margin: 'auto'}}>
                                <CardTitle className="steam" expand>
                                    <button onClick={this._addService} value={"steam"} className="addService">
                                    </button>
                                </CardTitle>
                            </Card>
                        </Cell>
                        <Cell col={4}>
                            <Card shadow={0} style={{width: '320px', height: '320px', margin: 'auto'}}>
                                <CardTitle className="reddit" expand>
                                    <button onClick={this._addService} value={"reddit"} className="addService">
                                    </button>
                                </CardTitle>
                            </Card>
                        </Cell>
                        <Cell col={4}>
                            <Card shadow={0} style={{width: '320px', height: '320px', margin: 'auto'}}>
                                <CardTitle className="bpi" expand>
                                    <button onClick={this._addService} value={"bpi"} className="addService">
                                    </button>
                                </CardTitle>
                            </Card>
                        </Cell>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: state.services,
        servicesToString: state.servicesToString,
        isAdmin: state.isAdmin,
        createSpotify: state.createSpotify,
        createLol: state.createLol,
        createReddit: state.createReddit,
        createMeteo: state.createMeteo,
        createSteam: state.createSteam,
        createBpi: state.createBpi,
        myToken: state.myToken,
        myId: state.myId,
    }
}
export default connect(mapStateToProps)(Introduction)
