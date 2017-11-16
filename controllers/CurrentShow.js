


function CurrentShowController(db, Shows, NowPlaying){

    var currentShow = {};

    this.setCurrentShow = function(showSlug, title = "", description = "", disableSongDisplay = false){
        currentShow = {
            slug : showSlug,
            title : title,
            description : description, 
            disableSongDisplay : disableSongDisplay
        }
    }

    this.clearCurrentShow = function(){
        currentShow = {};
    }

    this.getCurrentShow = function(){
        return currentShow;
    }

}

module.exports = CurrentShowController;