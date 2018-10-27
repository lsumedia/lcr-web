import * as React from 'react';
import Axios from 'axios';

import './episodes.css';

import { LoadingIndicator } from '../../components/loading/loading';
import { ResponsiveContainer } from '../../components/responsiveContainer';
import { EpisodeCard } from '../../miniviews/episodeCard';

enum ViewModes {
    LIST,
    CARDS
}


export class EpisodeListView extends React.Component<any, any>{

    constructor(props: any){
        super(props);
        this.state = {
            episodeCount: null,
            episodes: null,
            viewMode: ViewModes.LIST
        }
    }

    componentWillMount(){

        Axios.get('/api/private/episode?limit=50').then((response) => {
            this.setState({episodes : response.data});
        });

        Axios.get('/api/private/episode/count').then((response) => {
            this.setState({episodeCount: response.data.count});
        });
    }

    render(){

        try{

            if(this.state.episodeCount == null || this.state.episodes == null) throw "Loading";

            let navigation = (
                <div>
                    {this.state.episodeCount} episodes
                </div>
            );

            let list = (
                <div className="lister">
                {this.state.episodes.map((episode: any, i: number) => {
                    return <EpisodeCard episode={episode} key={i}/>
                })}
            </div>);

            return(<div className="episodes">
                <ResponsiveContainer title={navigation}>
                    {list}
                </ResponsiveContainer>
            </div>);

        }catch(err){

            return <LoadingIndicator message={err.message}/>

        }
       
    }
}