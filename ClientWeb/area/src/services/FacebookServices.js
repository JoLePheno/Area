import React, {Component} from 'react';
import "../App.css"
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch} from 'react-mdl';
import FacebookLogo from "../ressources/facebookLogo.png";
import AppletsFacebook1 from "../applets/facebook/AppletsFacebook1";
import AppletsFacebook2 from "../applets/facebook/AppletsFacebook2";


class FacebookService extends Component {
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
                        <AppletsFacebook1/>
                    </Cell>
                    <Cell col={6}>
                        <AppletsFacebook2/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default FacebookService;