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
    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <StatsCard
                                bigIcon={<i className="pe-7s-music text-info"></i>}
                                statsText="Current listeners"
                                statsValue="43"
                                statsIcon={<i className="fa fa-refresh"></i>}
                                statsIconText="App & web"
                            />
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <StatsCard
                                bigIcon={<i className="pe-7s-server text-success"></i>}
                                statsText="Storage space used"
                                statsValue="500 MB"
                                statsIcon={<i className="fa fa-calendar-o"></i>}
                                statsIconText="3.4 GB remaining"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Card
                                statsIcon="fa fa-clock-o"
                                id="songlist"
                                classes=""
                                title="Most Recent Songs"
                                category=""
                                stats="Updated every minute"
                                content={
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                {
                                                    thArray.map((prop, key) => {
                                                        return (
                                                        <th  key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tdArray.map((prop,key) => {
                                                    return (
                                                        <tr key={key}>{
                                                            prop.map((prop,key)=> {
                                                                return (
                                                                    <td  key={key}>{prop}</td>
                                                                );
                                                            })
                                                        }</tr>
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
