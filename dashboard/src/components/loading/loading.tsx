import * as React from 'react';

import loadAnimation from './Cube-1s-200px.svg';

export class LoadingIndicator extends React.Component<any, any>{

    render(){

        const containerStyles: React.CSSProperties = {
            position: "fixed",
            width: "100%"
        }

        const imageStyles: React.CSSProperties = {
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            marginTop: "30vh",
            width: "150px"
        }

        const messageStyles: React.CSSProperties = {
            textAlign: "center",
            marginTop: "15px",
            fontSize: "1.2em"
        }

        return (<div style={containerStyles}>
            <img style={imageStyles} src={loadAnimation} />
            {(this.props.message)?
            <div style={messageStyles}>{this.props.message}</div> :
            ""
            }
        </div>);
    }
}