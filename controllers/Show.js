

function ShowController(db){

    this.insert = function(title, description, tags, image){
        var newShow = {
            title : title,
            description : description,
            tags : tags,
            image : image
        }
    }

    this.update = function(showID, title, description, tags, image){

    }
    
    this.delete = function(showID){

    }

    this.getShowByTitle = function(title){

    }

    this.getShowById = function(showID){
        return false;
    }

    this.getShowsAll = function(limit = 0, skip = 0){

    }

    this.getShowsByTag = function(limit = 0, skip = 0){

    }

    this.getShowsByStringSearch = function(limit = 0, skip = 0){

    }

    this.getNumberOfShows = function(){

    }

}

module.exports = ShowController;