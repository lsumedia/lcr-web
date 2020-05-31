import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Dashboard from '../../views/Dashboard/Dashboard';
import BackupPage from '../../views/Backup/Backup';
import ShowsPage from '../../views/Shows/Shows';
import EpisodesPage from '../../views/Episodes/Episodes';
import SchedulePage from '../../views/Schedule/Schedule'; 
import TokensPage from '../../views/Tokens/Tokens.jsx'; 
import Notifications from '../../views/Notifications/Notifications';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';

import {style} from "../../variables/Variables.jsx";


class App extends Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        var _notificationSystem = this.refs.notificationSystem;
        
    }
    render() {
        return (

                <div className="wrapper">
                    <NotificationSystem ref="notificationSystem" style={style}/>
                    <Sidebar {...this.props} />
                    <div id="main-panel" className="main-panel">
                        <Header {...this.props}/>

                            <Switch>
                                <Route path="/dashboard" component={Dashboard}/>
                                <Route path="/shows" component={ShowsPage}/>
                                <Route path="/episodes" component={EpisodesPage}/>
                                <Route path="/schedule" component={SchedulePage}/>
                                <Route path="/tokens" component={TokensPage}/>
                                <Route path="/backup" component={BackupPage}/>
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>

                        <Footer />
                    </div>
                </div>


        );
    }
}

export default App;
