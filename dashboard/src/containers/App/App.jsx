import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Dashboard from '../../views/Dashboard/Dashboard';
import ShowsPage from '../../views/Shows/Shows';
import EpisodesPage from '../../views/Episodes/Episodes';
import SchedulePage from '../../views/Schedule/Schedule'; 
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
        var color = Math.floor((Math.random() * 4) + 1);
        var level;
        switch (color) {
            case 1:
                level = 'success';
                break;
            case 2:
                level = 'warning';
                break;
            case 3:
                level = 'error';
                break;
            case 4:
                level = 'info';
                break;
            default:
                break;
        }
        /*
        _notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.
                </div>
            ),
            level: level,
            position: "tr",
            autoDismiss: 15,
        }); */
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
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>

                        <Footer />
                    </div>
                </div>


        );
    }
}

export default App;
