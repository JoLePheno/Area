import React, {Component} from 'react';
import "../App.css"
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch} from 'react-mdl';
import AppletsSpotify1 from "../applets/spotify/AppletsSpotify1"
import AppletsSpotify2 from "../applets/spotify/AppletsSpotify2"
import AppletsSpotify3 from "../applets/spotify/AppletsSpotify3"
import AppletsSpotify4 from "../applets/spotify/AppletsSpotify4"
import AppletsSpotify5 from "../applets/spotify/AppletsSpotify5"

class SpotifyServices extends Component {
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
                        <AppletsSpotify1/>
                    </Cell>
                    <Cell col={6}>
                        <AppletsSpotify2/>
                    </Cell>
                    <Cell col={6}>
                        <AppletsSpotify3/>
                    </Cell>
                    <Cell col={6}>
                        <AppletsSpotify4/>
                    </Cell>
                    <Cell col={6}>
                        <AppletsSpotify5/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default SpotifyServices;
