const mongoose = require('mongoose');
const Show = mongoose.model('show');


function CurrentShowController(NowPlaying){

    var currentShow = {};

    function validate(obj){
        return {
            slug : obj.slug || null,
            title : obj.title || "",
            description : obj.description || "", 
            image : obj.image || "",
            disableSongDisplay : obj.disableSongDisplay || false
        }
    }

    this.setCurrentShow = function(obj){
        return new Promise((resolve, reject) =>{
            currentShow = validate(obj);
            resolve(currentShow);
        });
    }

    this.clearCurrentShow = function(){
        return new Promise((resolve, reject) =>{
            currentShow = {};
            resolve(currentShow);
        });
    }

    this.getCurrentShow = function(){

        var result = currentShow;

        result.trackData = NowPlaying.currentTrackInfo();

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