import React, { Component } from 'react';
import ScalableContainer from '../components/ScalableContainer';

//import * as videojs from 'video.js';

class Message extends Component{
    render(){
        return (
            <ScalableContainer content={
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="name-field">Name</label>
                            <input type="text" class="form-control" id="name-input" placeholder="Enter name" />
                        </div>
                        <div class="form-group">
                            <label for="content-text">Message</label>
                            <textarea class="form-control" id="content-text" rows="5"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>  
            } />
        );
    }
}

export default Message;