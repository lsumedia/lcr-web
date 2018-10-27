import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardImg, CardBody, CardSubtitle } from 'reactstrap';

import placeholder from './default-placeholder.png';
import { niceDate } from '../util/date';
import { IEpisode } from '../types/episode';

interface EpisodeCardProps{
    episode : IEpisode
}

export class EpisodeCard extends React.Component<EpisodeCardProps, any>{

    render(){
        const episode = this.props.episode;
        const editUrl = "/dashboard/episode/" + episode._id;

        return(
            <Card style={{maxWidth: "200px"}}>
                {(episode.image)? <CardImg top width="100%" src={episode.image} alt="Episode image" /> : <CardImg src={placeholder} top/>}
                <CardBody>
                    <CardTitle>
                        <Link to={editUrl}>
                            {episode.title}
                        </Link>
                    </CardTitle>
                    <CardSubtitle>{niceDate(episode.publishTime)}</CardSubtitle>
                </CardBody>
            </Card>
        );
    }

}