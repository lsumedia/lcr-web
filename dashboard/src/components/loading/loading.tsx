import * as React from 'react';

import loadAnimation from './Cube-1s-200px.svg';

export class LoadingIndicator extends React.Component<any, any>{

    render(){

        return (<div style={{
            position: "fixed",
            width: "100%"
            }}>
            <img style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                marginTop: "30vh",
                width: "150px"
            }} src={loadAnimation} />
            {(this.props.message)?
            <div>{this.props.message}</div> :
            ""
            }
        </div>);
    }
}