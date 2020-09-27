
import { IShow, IShowLive } from '@common/model/show';
import { Logger } from 'mongodb';
import { RepositoryStore } from 'repository/repositoryStore';

const mongoose = require('mongoose');
const Show = mongoose.model('show');

export interface CurrentShowControllerProps{
    repositoryStore: RepositoryStore
}

export class CurrentShowController{
    
    private currentShow: IShowLive | null = null;

    constructor(private props: CurrentShowControllerProps){

    }

    public validate(obj: IShowLive): IShowLive{
        return obj;
        // return {
        //     slug : obj.slug,
        //     title : obj.title || "",
        //     description : obj.description || "", 
        //     image : obj.image || "",
        //     disableSongDisplay : obj.disableSongDisplay || false
        // }
    }

    public async setCurrentShow(obj: IShowLive){
        this.currentShow = this.validate(obj);
        return this.currentShow;
    }

    public async clearCurrentShow(){
        this.currentShow = null;
        return this.currentShow;
    }

    public async getCurrentShow(){

        var result = this.currentShow;

        //This needs to be added back when NowPlaying is restored
        // result.trackData = NowPlaying.currentTrackInfo();

        const { repositoryStore } = this.props;
        const { shows } = repositoryStore;

        if(!this.currentShow) return {}

        try{

            await shows.collection.findOne({ slug: this.currentShow.slug })

        }catch(err){
            
        }


        return new Promise((resolve, reject) =>{
            
            Show.findOne({ slug : currentShow.slug }, function(err, show){
                if(err || !show){
                    result.show = {};
                }else{
                    try{
                        result.show = show;

                        if(!result.image) result.image = show.image;
                        if(!result.title) result.title = show.title;
                        if(!result.description) result.description = show.description;
                    }catch(err){
                        console.log(err);
                        resolve(result);
                    }
                   
                }
                resolve(result);
            });

        });
    }

}

module.exports = CurrentShowController;