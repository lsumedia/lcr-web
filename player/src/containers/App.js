import React, { Component } from 'react';

import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import '../assets/css/bootstrap.css';
import '../assets/css/App.css';

import Nav from '../components/Nav';
import NavMenu from '../components/NavMenu';
import AudioPlayer from '../components/AudioPlayer';

//Pages
import Live from '../views/Live';
import Backtrack from '../views/Backtrack';
import Schedule from '../views/Schedule';
import Episode from '../views/Episode'
import Show from '../views/Show';

class App extends Component {

    state = { 
        open : false
    }

    toggleMenu(){
        var newOpenState = this.state.open ? false : true;
        this.setState({open: newOpenState});
    }
    
    hideMenu(){
        this.setState({open: false});
    }

    render() {

        const { open } = this.state
        return (
        <div className="App">

            <Nav toggleMenu={this.toggleMenu.bind(this)} hideMenu={this.hideMenu.bind(this)}/>

            <NavMenu open={open} toggleMenu={this.toggleMenu.bind(this)} hideMenu={this.hideMenu.bind(this)}/>
                
            
            <div className="scroll-container">
                
                <Switch>
                    <Route path="/backtrack" component={Backtrack}/>
                    <Route path="/schedule" component={Schedule}/>
                    <Route path="/episode/:id" component={Episode} />
                    <Route path="/show" component={Show} />
                    <Route path="/" component={Live}/>
                </Switch> 

            </div>

            <AudioPlayer  
                src="http://ice.lsu.co.uk:8080/lcrhigh" 
                type="audio/mpeg" 
                autoplay={false}/>
            </div>
        );
    }
}

export default App;
