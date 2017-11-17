


function CurrentShowController(db, Shows, NowPlaying){

    var currentShow = {};

    function validate(obj){
        return {
            slug : obj.showSlug || null,
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
        return new Promise((resolve, reject) =>{
            resolve(currentShow);
        });
    }

}

module.exports = CurrentShowController;