import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ScalableContainer from '../components/ScalableContainer';
import { defaultData, daysOfWeek, months } from '../Variables.jsx';

//import * as videojs from 'video.js';

const $ = window.$;

class Schedule extends Component{

    state = {
      scheduleslots : []
    }

    showtitles = {};
    showimages = {};
    showdescriptions = {};

    getSchedule(){
        $.getJSON('/api/public/scheduleslot').done((response) => {
            this.setState({scheduleslots : response});
        });
    }

    getShows(){
        $.getJSON('/api/public/show/').done((response) => {
            response.map((show) => {
                this.showtitles[show.slug] = show.title;
                this.showimages[show.slug] = show.image;
                this.showdescriptions[show.slug] = show.description;
            });
            this.setState({});
        });
    }

    componentWillMount(){
        this.getShows();
        this.getSchedule();
    }

    render(){

        var scheduleslots = this.state.scheduleslots;

        var scheduleItems = scheduleslots.map((scheduleslots) => {

            var image = this.showimages[scheduleslots.showSlug];
            var path = '/show/' + scheduleslots.showSlug;

            if(!image) image = defaultData.image;

            return (
              <NavLink to={path} className="schedule-list-item">
                <div className="list-group-item">
                    <table>
                      <tr>
                        <td rowSpan="2" width="120px" valign="top">
                          <div className="align-items-center">
                            <p align="center"><span className="schedule-day">{daysOfWeek[scheduleslots.dow - 1]}</span><br />
                            <span className="schedule-time">{scheduleslots.startTime}</span></p>
                          </div>
                        </td>
                        <td rowSpan="2" width="150px" valign="top"><img className="schedule-image" src={image} width="150px" /></td>
                        <td valign="top"><span className="schedule-title float-left">{this.showtitles[scheduleslots.showSlug]}</span></td>
                      </tr>
                      <tr>
                        <td valign="top"><span className="schedule-description float-left">{this.showdescriptions[scheduleslots.showSlug]}</span></td>
                      </tr>
                    </table>
                </div>
              </NavLink>
            );
        });
        return (
            <ScalableContainer content={
              <div className="card square-card">
                  <div className="lcr-list-title">LCR Schedule</div>
                  <ul className="list-group list-group-flush">
                      {scheduleItems}
                  </ul>
              </div>
            }/>
        );
    }
}

export default Schedule;
