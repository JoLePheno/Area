import React, {Component} from 'react';
import "../../App.css"
import {connect} from "react-redux";
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch} from 'react-mdl';


class AppletsSpotify6 extends Component {
    constructor() {
        super();

        this.state = {};
        this._handleChange = this._handleChange.bind(this);
        this.removeApplets = this.removeApplets.bind(this);
        this.addApplets = this.addApplets.bind(this);
    }

    addApplets(e) {
        //add applets in db
    }

    removeApplets(e) {
        // remove applets from db
    }

    _handleChange(e) {
        console.log(e.target.id)
        console.log(this.props.switchValue.spotifyApplets6)
        const actionAff = { type: "APPLETS", value: e.target.id }
        this.props.dispatch(actionAff)
        if (this.props.switchValue.spotifyApplets6 === false) {
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
                            <br/>Send a mail every day of the best top artists<br/>
                        </h6>
                    </CardTitle>
                    <CardActions border style={{
                        borderColor: 'rgba(1, 0, 0, 0.2)',
                        display: 'flex',
                        boxSizing: 'border-box',
                        alignItems: 'center',
                        color: '#fff'
                    }}>
                        <Switch checked={this.props.switchValue.spotifyApplets6} ripple id="spotifyApplets6" onChange={this._handleChange}>Turn On/Off</Switch>
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
        switchValue: state.switchValue
    }
}
export default connect(mapStateToProps)(AppletsSpotify6)
