import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import Card from '../../components/Card/Card.jsx';
import {dowDict} from '../../variables/Variables.jsx';

const $ = window.$;

class TableList extends Component {

    state = {
      scheduleslots : [],
    };

    showtitles = {};

    updateShowsList(){
        $.get('/api/private/show').done((response) => {
            response.map((show) => {
                this.showtitles[show.slug] = show.title;
            });
            this.setState({});
        });
    }

    updateScheduleSlotList(){
        $.get('/api/private/scheduleslot').done((response) => {
            this.setState({scheduleslots: response});
            console.log(this.state);
        });
    }

    componentWillMount(){
      this.updateShowsList();
      this.updateScheduleSlotList();
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Card
                                cardClass=""
                                id="songlist"
                                title="Schedule"
                                contentClass="table-responsive table-full-width"
                                content={
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Show Title</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Day</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.scheduleslots.map((prop,key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{this.showtitles[prop.showSlug]}</td>
                                                            <td>{prop.startTime}</td>
                                                            <td>{prop.endTime}</td>
                                                            <td>{dowDict[prop.dow]}</td>
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

export default TableList;
