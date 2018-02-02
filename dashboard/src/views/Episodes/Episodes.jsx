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

/* global $ */

class EpisodesPage extends Component {
    state = { 
        shows : [],
        episodes : []
    };

    updateShowsList(){
        $.get('/api/private/show').done((response) => {
            this.setState({shows: response});
        });
    }

    updateEpisodesList(){
        $.get('/api/private/episode').done((response) => {
            this.setState({episodes: response});
        });
    }

    getSecretForToken(id){
        console.log("get secret for " + id);
        $.get(`/api/private/token/${id}`).done((response) => {
            console.log(response);
            this.secrets[id] = response.secret;
            console.log(this.secrets);
            this.setState({});
        });
    }



    deleteShow(id){
        $.ajax({ 
            url : `/api/private/show/${id}`, 
            method : "delete",
            data : {}
        }).done((response) => {
            this.updateTokensList();
        });
    }


    componentWillMount(){
        this.updateShowsList();
        this.updateEpisodesList();
    }

    componentWillUnmount(){
    }

    constructor(props){
        super(props);
    
        this.updateShowsList = this.updateShowsList.bind(this);
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Card
                                statsIcon=""
                                id="songlist"
                                classes=""
                                title="Episodes"
                                category=""
                                stats=""
                                content={
                                    <div style={{textAlign : "right"}}> 
                                        <button className="btn btn-flat" onClick={() => { }}>Add Episode</button>
                                        <Table hover>
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Show</th>
                                                    <th>Description</th>
                                                    <th>Tags</th>
                                                    <th>Active</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.episodes.map((prop,key) => {

                                                        
                                                        var creation = new Date(prop.creation);
                                                        var date = creation.toDateString() + " " + creation.toLocaleTimeString();
                                                        var id = prop._id;

                                                        return (
                                                            <tr key={key}>
                                                                <td>{prop.title}</td>
                                                                <td>{prop.showSlug}</td>
                                                                <td>{prop.description.substr(0,40)}</td>
                                                                <td>{prop.tags}</td>
                                                                <td>{prop.active ? "Active" : "Inactive"}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EpisodesPage;
