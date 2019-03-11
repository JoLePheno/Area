import React, {Component} from 'react';
import "../App.css"
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch} from 'react-mdl';
import AppletsReddit1 from "../applets/reddit/AppletsReddit1";


class RedditServices extends Component {
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
                        <AppletsReddit1/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default RedditServices;
