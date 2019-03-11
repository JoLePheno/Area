import React, {Component} from 'react';
import "../App.css"
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch} from 'react-mdl';
import AppletsMeteo1 from "../applets/meteo/AppletsMeteo1";
import AppletsMeteo2 from "../applets/meteo/AppletsMeteo2";
import AppletsMeteo3 from "../applets/meteo/AppletsMeteo3";

class MeteoServices extends Component {
    constructor() {
        super();

        this.state = {
        };
    }

    render() {
        return (
            <div style={{width: '80%', margin: 'auto'}}>
                <Grid className="demo-grid-1">
                    <Cell col={4}>
                        <AppletsMeteo1/>
                    </Cell>
                    <Cell col={4}>
                        <AppletsMeteo2/>
                    </Cell>
                    <Cell col={4}>
                        <AppletsMeteo3/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default MeteoServices;
