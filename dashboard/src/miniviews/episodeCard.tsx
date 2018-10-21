import * as React from 'react';
import { Card, CardTitle, CardImg, CardBody, CardSubtitle } from 'reactstrap';

import { niceDate } from '../util/date';
import { IEpisode } from '../types/episode';

interface EpisodeCardProps{
    episode : IEpisode
}

export class EpisodeCard extends React.Component<EpisodeCardProps, any>{

    render(){
        const episode = this.props.episode;

        return(
            <Card style={{maxWidth: "250px"}}>
                {(episode.image)? <CardImg top width="100%" src={episode.image} alt="Episode image" /> : ""}
                <CardBody>
                    <CardTitle>{episode.title}</CardTitle>
                    <CardSubtitle>{niceDate(episode.publishTime)}</CardSubtitle>
                </CardBody>
            </Card>
        );
    }

}