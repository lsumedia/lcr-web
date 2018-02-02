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

class TokensPage extends Component {
    state = { 
        tracks : [],
        tokens : []
    };
    
    secrets = {};

    updateTokensList(){
        $.get('/api/private/token').done((response) => {
            this.setState({tokens: response});
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

    generateNewToken(){
        $.post(`/api/private/token/`).done((response) => {
            this.updateTokensList();
        });
    }

    deleteToken(id){
        $.ajax({ 
            url : `/api/private/token/${id}`, 
            method : "delete",
            data : {}
        }).done((response) => {
            this.updateTokensList();
        });
    }


    componentWillMount(){
        this.updateTokensList();
    }

    componentWillUnmount(){
    }

    constructor(props){
        super(props);
    
        this.updateTokensList = this.updateTokensList.bind(this);
        this.getSecretForToken = this.getSecretForToken.bind(this);
        this.generateNewToken = this.generateNewToken.bind(this);
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Card
                                statsIcon="fa fa-lock"
                                id="songlist"
                                classes=""
                                title="Authentication tokens"
                                category=""
                                stats="Tokens can be used for authenticating external applications"
                                content={
                                    <div style={{textAlign : "right"}}> 
                                        <button className="btn btn-flat" onClick={() => {this.generateNewToken()}}>Generate New Token</button>
                                        <Table hover>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Created At</th>
                                                    <th style={{textAlign : "right"}}>Secret</th>
                                                    <th style={{textAlign : "right"}}>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.tokens.map((prop,key) => {

                                                        
                                                        var creation = new Date(prop.creation);
                                                        var date = creation.toDateString() + " " + creation.toLocaleTimeString();
                                                        var id = prop._id;

                                                        var secret = (this.secrets[id])? this.secrets[id] : (
                                                            <span onClick={() => {this.getSecretForToken(id)}} style={{cursor: "pointer"}}>
                                                                <i className="fa fa-lock"></i>
                                                                Reveal Secret
                                                            </span>);

                                                        return (
                                                            <tr key={key}>
                                                                <td>{prop._id}</td>
                                                                <td>{date}</td>
                                                                <td style={{textAlign : "right"}}>{secret}</td>
                                                                <td style={{cursor: "pointer", textAlign : "right"}} onClick={() => { this.deleteToken(id)}}><i className="fa fa-trash"></i></td>
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

export default TokensPage;
