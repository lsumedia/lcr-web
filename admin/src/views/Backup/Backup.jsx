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
                        <div className="col-md-6">
                            <Card
                                statsIcon="fa fa-clock-o"
                                id="songlist"
                                classes=""
                                title="Episodes"
                                category=""
                                stats=""
                                content={
                                    <div>
                                        <div>
                                            <a href="/api/private/backup/episode" download="episodes.json"><button className="btn btn-default">Download Episodes backup</button></a>
                                        </div>
                                        <form encType="multipart/form-data" action="/api/private/backup/episode" method="post">
                                            <label for="episodes-upload">Restore episodes from file</label>
                                            <input id="episodes-upload" name="episodes" type="file"  className="form-control"/>
                                            <input className="btn btn-default" type="submit" value="Upload" />
                                        </form>
                                    </div>
                                }
                            />
                        </div>
                        <div className="col-md-6">
                            <Card
                                statsIcon="fa fa-clock-o"
                                id="songlist"
                                classes=""
                                title="Shows"
                                category=""
                                stats=""
                                content={
                                    <div>
                                        <div>
                                            <a href="/api/private/backup/show" download="shows.json"><button className="btn btn-default">Download Shows backup</button></a>
                                        </div>
                                        <form encType="multipart/form-data" action="/api/private/backup/show" method="post">
                                            <label for="shows-upload">Restore shows from file</label>
                                            <input id="shows-upload" name="shows" type="file" className="form-control" />
                                            <input className="btn btn-default" type="submit" value="Upload"/>
                                        </form>
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
