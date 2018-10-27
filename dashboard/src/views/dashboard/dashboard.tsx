import * as React from 'react';
import Axios from 'axios';
import { ResponsiveContainer } from '../../components/responsiveContainer';

import { EpisodeCard } from '../../miniviews/episodeCard';

import './dashboard.css';

class EpisodeLister extends React.Component<any, any>{

    constructor(props: {}){
        super(props);
        this.setState({episodes: []})
    }

    componentWillMount(){
        Axios.get('/api/private/episode?limit=10').then((response) => {
            this.setState({episodes : response.data});
        });
    }

    render(){
        try{
            return(
                <div className="lister">
                    {this.state.episodes.map((episode: any, i: number) => {
                        return <EpisodeCard episode={episode} key={i}/>
                    })}
                </div>
            )
        }catch(err){
            return <div>Loading...</div>
        }
        
    }
}

export class DashboardView extends React.Component{

    render(){
        return (<div className="dashboard">
            <ResponsiveContainer title="Most recent episodes">
                <EpisodeLister />
            </ResponsiveContainer>
            <ResponsiveContainer title="Recent songs">
                
            </ResponsiveContainer>
        </div>);
    }


}