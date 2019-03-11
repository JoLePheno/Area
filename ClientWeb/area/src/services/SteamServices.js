import React, {Component} from 'react';
import "../App.css"
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch} from 'react-mdl';
import FacebookLogo from "../ressources/facebookLogo.png";
import AppletsSteam1 from "../applets/steam/AppletsSteam1";
import AppletsSteam2 from "../applets/steam/AppletsSteam2";


class SteamServices extends Component {
    constructor() {
        super();

        this.state = {
        };
    }

    render() {
        return (
            <div style={{width: '80%', margin: 'auto'}}>
                <Grid className="demo-grid-1">
                    <Cell col={6}>
                        <AppletsSteam1/>
                    </Cell>
                    <Cell col={6}>
                        <AppletsSteam2/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default SteamServices;
