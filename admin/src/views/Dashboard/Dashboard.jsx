import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import {Table} from 'react-bootstrap';


import {Card} from '../../components/Card/Card.jsx';
import {StatsCard} from '../../components/StatsCard/StatsCard.jsx';
import {Tasks} from '../../components/Tasks/Tasks.jsx';
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar,
    thArray, 
    tdArray
} from '../../variables/Variables.jsx';

/* global $, globals */

class Dashboard extends Component {
    createLegend(json){
        var legend = [];
        for(var i = 0; i < json["names"].length; i++){
            var type = "fa fa-circle text-"+json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(" ");
            legend.push(
                json["names"][i]
            );
        }
        return legend;
    }

    state = { 
        tracks : []
    };
    
    updateNowPlaying(){
        $.get('/api/public/songs/recent?limit=8').done((response) => {
            this.setState({tracks: response});
        });
    }

    componentWillMount(){
        this.updateNowPlaying();
        this.refreshSongInterval = setInterval(this.updateNowPlaying.bind(this), 5000);
    }

    componentWillUnmount(){
        clearInterval(this.refreshSongInterval);
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Card
                                statsIcon="fa fa-clock-o"
                                id="songlist"
                                classes=""
                                title="Recently played songs"
                                category=""
                                stats="Updated every 30 seconds"
                                content={
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Time</th>
                                                <th>Title</th>
                                                <th>Artist</th>
                                                <th>Play Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.tracks.map((prop,key) => {

                                                    
                                                    var date = new Date(prop.timestamp);
                                                    var hours = date.getHours();
                                                    var minutes = "0" + date.getMinutes();
                                                    var formatted = hours + ':' + minutes.substr(-2);
                                                    return (
                                                        <tr key={key}>
                                                            <td>{formatted}</td>
                                                            <td>{prop.title}</td>
                                                            <td>{prop.artist}</td>
                                                            <td></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
