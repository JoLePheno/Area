import React, {Component} from 'react';
import "../App.css"
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch} from 'react-mdl';
import FacebookLogo from "../ressources/facebookLogo.png";
import AppletsLol1 from "../applets/lol/AppletsLol1";
import AppletsLol2 from "../applets/lol/AppletsLol2";


class LolServices extends Component {
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
                        <AppletsLol1/>
                    </Cell>
                    <Cell col={6}>
                        <AppletsLol2/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default LolServices;
