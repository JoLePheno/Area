import React, {Component} from 'react';
import "../App.css"
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch} from 'react-mdl';
import AppletsBpi1 from "../applets/bbpi/AppletsBpi1"


class BpiServices extends Component {
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
                        <AppletsBpi1/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default BpiServices;
