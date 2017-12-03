import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import defaultData from '../Variables.jsx';

/* global $ */

function ShowList(props){
    const shows = props.shows;
    const listItems = shows.map((show) => {
        var path = '/backtrack/' + show.slug;
        return (
            <NavLink to={path} className="list-group-item" key={show.slug}>
                {show.title}
            </NavLink>
        );
    });
    return (
        <div className="card" >
        <h3 className="menu-title-3">Shows</h3>
                <ul className="list-group list-group-flush hide-md-and-down">
                    {listItems}
                </ul>
            </div>
    )
}

class ShowPage extends Component{
    
    state = { showmeta : {} }

    getShowData(){
        var slug = this.props.match.params.slug;
        $.getJSON('/api/public/show/' + slug).done((response) => {
            this.setState({showmeta: response})
        });
    }

    getEpisodes(){
        var slug = this.props.match.params.slug;
        
    }

    componentDidMount(){
        this.getShowData();
    }

    render(){
        var showData = this.state.showmeta;
        if(!showData.image) showData.image = defaultData.image;
        return (
        <div className="" id="live-container">
          <div className="row">
              <div class="col-sm-12 col-lg-8 col-xl-7 offset-xl-2">
                <div className="card">
                  <img className="card-img-top" src={showData.image} alt="Show Image" />
                </div>
                <div className="card-body now-playing-info">
                  <h4 className="card-title">{showData.title}</h4>
                  {showData.description}
                </div>
              </div>
              <div class="col-sm-12 col-lg-4 col-xl-3">
               </div>
          </div> 
      </div>)
    }
}


class Backtrack extends Component{

    state = { shows : [] }

    getShowsList(){
        $.getJSON('/api/public/show').done((response) => {
            this.setState({shows : response});
        });
    }

    
    componentDidMount(){
        this.getShowsList();
    }

    render(){
        return (
            <div className="">
                <Switch>
                    <Route path="/backtrack/:slug" component={ShowPage} />
                    <Route path="/backtrack">
                        <ShowList shows={this.state.shows} />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Backtrack;