import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import {Table} from 'react-bootstrap';


import {Card} from '../../components/Card/Card.jsx';
import {StatsCard} from '../../components/StatsCard/StatsCard.jsx';
import {Tasks} from '../../components/Tasks/Tasks.jsx';
import {
} from '../../variables/Variables.jsx';

/* global $ */

class BackupPage extends Component {

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Card
                                statsIcon="fa fa-clock-o"
                                id="songlist"
                                classes=""
                                title="Backup & Restore"
                                category=""
                                stats=""
                                content={
                                    <div>
                                        <div>
                                            <h5>Episodes</h5>
                                            <a href="/api/private/backup/episode" download="episodes.json"><button className="btn btn-default">Download Episodes backup</button></a>
                                        </div>
                                        <div>
                                            <h5>Shows</h5>
                                            <a href="/api/private/backup/show" download="episodes.json"><button className="btn btn-default">Download Shows backup</button></a>
                                        </div>
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

export default BackupPage;
