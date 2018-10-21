import * as React from 'react';

import './responsiveContainer.css';

interface ResponsiveContainerProps{
    title? : any;
}

export class ResponsiveContainer extends React.Component<ResponsiveContainerProps, any>{

    render(){

        const classes = "container responsive-container " + ((this.props.title)? "has-title" : "");

        return(
            <div className={classes}>
                {(this.props.title)? <div className="responsive-container-title">{this.props.title}</div> : ""}
                {this.props.children}
            </div>
        )

    }
}