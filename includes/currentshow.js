


function CurrentShowController(Shows, NowPlaying){

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
            
            Shows.getShowBySlug(currentShow.slug).then(function(show){
                result.show = show;

                if(result.image.length < 1) result.image = show.image;
                if(result.title.length < 1) result.title = show.title;
                if(result.description.length < 1) result.description = show.description;

                resolve(result);

            }, function(err){

                result.show = {};
                resolve(result);
                
            });

        });
    }

}

module.exports = CurrentShowController;