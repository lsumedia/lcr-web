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
        episodes : [],
        limit : 10,
        page : 0,
        episodeCount : 0,
        searchTerm : ""
    };

    shows = {}

    updateShowsList(){
        $.get('/api/private/show').done((response) => {
            response.map((show) => {
                this.shows[show.slug] = show.title;
            });
            this.setState({});
        });
    }

    getShowBySlug(slug){
        if(this.shows[slug]) return this.shows[slug];
        return slug;
    }

    updateLists(){
        this.updateShowsList();
        this.updateEpisodeCount();
        this.updateEpisodesList();
    }

    updateEpisodesList(){
        var limit = this.state.limit;
        var offset = limit + (this.state.page * limit);
        $.get(`/api/private/episode?limit=${limit}&offset=${offset}`).done((response) => {
            this.setState({episodes: response});
        });
    }

    updateEpisodeCount(){
         $.get(`/api/private/episode/count`).done((response) => {
            this.setState({episodeCount: response.count});
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

    toggleShowVisibility(id, publicState){
        return $.post(
            `/api/private/episode/${id}`,
            {
                public : publicState
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

    nextPage(){

    }

    previousPage(){
        /*if(page <= 0){
            this.page = 0;
        }else{
            this.page = this.page - 1;
        } */
    }

    pagination(){

        

        return(
            <ul className="pagination">
                <li className=""><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
                <li className=""><a href="#">1</a></li>
                <li className=""><a href="#">2</a></li>
                <li className=""><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
            </ul>
        );
    }


    componentWillMount(){
        this.updateLists();
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
                                title="Episode"
                                category=""
                                stats=""
                                content={
                                    <div style={{textAlign : "right"}}> 
                                    <div>There are {this.state.episodeCount}</div>
                                        <button className="btn btn-flat" onClick={() => { }}>Add Episode</button>
                                        <Table hover>
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Show</th>
                                                    <th>Description</th>
                                                    <th>Tags</th>
                                                    <th>Date Published</th>
                                                    <th className="text-right">Publish</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.episodes.map((prop,key) => {

                                                        
                                                        var creation = new Date(prop.publishTime);
                                                        var date = creation.toDateString() + " " + creation.toLocaleTimeString();
                                                        var id = prop._id;

                                                        var btnColor = "btn " + ((prop.public) ? 'btn-success ' : 'btn-danger');
                                                        
                                                        var publicButtonOnclick = () => {
                                                            console.log("hello there");
                                                            this.toggleShowVisibility(prop._id, !prop.public).then(() => {
                                                                this.updateLists();
                                                            });
                                                        }

                                                        return (
                                                            <tr key={key}>
                                                                <td>{prop.title}</td>
                                                                <td>{this.getShowBySlug(prop.showSlug)}</td>
                                                                <td>{prop.description.substr(0,40)}</td>
                                                                <td>{prop.tags}</td>
                                                                <td>{date}</td>
                                                                <td className="text-right">
                                                                    <button className={btnColor} onClick={publicButtonOnclick}>
                                                                        {prop.public ? "Public" : "Private"}
                                                                    </button>
                                                                </td>
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
