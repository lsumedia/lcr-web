import React, { Component } from 'react';
import ScalableContainer from '../components/ScalableContainer';

//import * as videojs from 'video.js';

class Search extends Component{
    render(){
        return (
            <ScalableContainer content={
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <input type="text" class="form-control" id="search-field" placeholder="Search" />
                        </div>
                    </div>
                </div>  
            } />
        );
    }
}

export default Search;