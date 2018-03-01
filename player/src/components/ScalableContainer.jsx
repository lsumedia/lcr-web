import React, {Component} from 'react';

class ScalableContainer extends Component{
    render(){
        return(
            <div className="row live-container">
                <div className="col-sm-12 col-xl-6 offset-xl-3">
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export default ScalableContainer;