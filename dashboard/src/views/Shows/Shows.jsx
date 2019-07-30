import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import {Table} from 'react-bootstrap';


import {Card} from '../../components/Card/Card.jsx';
import {StatsCard} from '../../components/StatsCard/StatsCard.jsx';
import {Tasks} from '../../components/Tasks/Tasks.jsx';
import {AddShowModalForm} from '../../components/ModalForm/ModalForm.jsx'
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

class ShowsPage extends Component {

    constructor(props){
        super(props);

        this.updateShowsList = this.updateShowsList.bind(this);
    }

    state = {
        shows : [],
        isOpen : false
    };

    secrets = {};

    updateShowsList(){
        $.get('/api/private/show').done((response) => {
            this.setState({shows: response});
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

    addShow(data, _this){
        $.ajax({
            url : '/api/private/show/',
            method : "post",
            data : data
        }).done((response) => {
          _this.updateShowsList()
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

    showHideInputForm = () => {
        this.setState(
          {
            isOpen: !this.state.isOpen
          }
        );
    }


    componentWillMount(){
        this.updateShowsList();
    }

    componentWillUnmount(){
    }

    render() {
        return (
            <div className="content">
                <AddShowModalForm show={this.state.isOpen} onClose={this.showHideInputForm} onSubmit={this.addShow} parent={this} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Card
                                statsIcon="fa fa-lock"
                                id="songlist"
                                classes=""
                                title="Shows"
                                category=""
                                stats=""
                                content={
                                    <div style={{textAlign : "right"}}>
                                        <button className="btn btn-flat" onClick={() => {this.showHideInputForm()}}>Add Show</button>
                                        <Table hover>
                                            <thead>
                                                <tr>
                                                    <th>Slug</th>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Tags</th>
                                                    <th>Active</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.shows.map((prop,key) => {


                                                        var creation = new Date(prop.creation);
                                                        var date = creation.toDateString() + " " + creation.toLocaleTimeString();
                                                        var id = prop._id;

                                                        return (
                                                            <tr key={key}>
                                                                <td>{prop.slug}</td>
                                                                <td>{prop.title}</td>
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

export default ShowsPage;
