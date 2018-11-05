import * as React from 'react';
import Axios from 'axios';

import './shows.css';

import { LoadingIndicator } from '../../components/loading/loading';
import { ResponsiveContainer } from '../../components/responsiveContainer';

export class ShowView extends React.Component<any, any>{

    constructor(props){
        super(props);
        this.state = {
            showCount: 0,
            shows: []
        }
    }

    componentWillMount(){

        Axios.get('/api/private/show?limit=50').then((response) => {
            this.setState({shows : response.data});
        });

        Axios.get('/api/private/show/count').then((response) => {
            this.setState({showCount: response.data.count});
        });
    }

    render(){
        try{

            if(this.state.showCount == null || this.state.shows == null) throw new Error("Loading...");

            let navigation = (
                <div>
                    {this.state.showCount} shows
                </div>
            );

            let list = (
                <div className="lister">
                {this.state.shows.map((show: any, i: number) => {
                    return <div>{show.title}</div>
                })}
            </div>);

            return(<div className="shows">
                <ResponsiveContainer title={navigation}>
                    {list}
                </ResponsiveContainer>
            </div>);

        }catch(err){
            return <LoadingIndicator message={err.message} />
        }
        
    }

}