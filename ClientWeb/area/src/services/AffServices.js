import React, {Component} from 'react';
import "../App.css"
import {connect} from "react-redux";
import SpotifyService from "../services/SpotifyServices"
import LolService from "../services/LolServices"
import SteamService from "../services/SteamServices"
import RedditService from "../services/RedditServices"
import BpiService from "../services/BpiServices"
import MeteoService from "../services/MeteoServices"


class AffServices extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                {this.props.services.indexOf('spotify') !== -1 ? <SpotifyService/> : null}
                {this.props.services.indexOf('lol') !== -1 ? <LolService/> : null}
                {this.props.services.indexOf('steam') !== -1 ? <SteamService/> : null}
                {this.props.services.indexOf('reddit') !== -1 ? <RedditService/> : null}
                {this.props.services.indexOf('bpi') !== -1 ? <BpiService/> : null}
                {this.props.services.indexOf('meteo') !== -1 ? <MeteoService/> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        services: state.services,
        servicesToString: state.servicesToString,
    }
}
export default connect(mapStateToProps)(AffServices)
