import React, {Component} from 'react';
import "../../App.css"
import {Card, CardTitle, CardActions, Cell, Grid, Icon, Switch} from 'react-mdl';


class AppletsFacebook2 extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div>
                <Card shadow={0} style={{width: '100%', height: '7%', background: '#3b5998'}}>
                    <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                        <h6 style={{marginTop: '0'}}>
                            <br/> Featured event: Send an email if it's raining tomorrow <br/>
                            Detail: Every night, it send an email if it's raining<br/>
                        </h6>
                    </CardTitle>
                    <CardActions border style={{
                        borderColor: 'rgba(1, 0, 0, 0.2)',
                        display: 'flex',
                        boxSizing: 'border-box',
                        alignItems: 'center',
                        color: '#fff'
                    }}>
                        <Switch ripple id="switch1">Turn On/Off</Switch>
                        <div className="mdl-layout-spacer"></div>
                        <Icon name="Facebook"/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default AppletsFacebook2;