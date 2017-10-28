

function ShowController(db){

    const slug = require('slug');

    var col = db.collection('shows');

    this.insert = function(title, description, tags, image){

        var showSlug = slug('title');
        
        var newShow = {
            title : title,
            slug : showSlug,
            description : description,
            tags : tags,
            image : image
        }

        return new Promise((resolve, reject) => {
            
            col.insertOne(newShow, function(err, r){
                console.log('show: Added new show ' + newShow.title);
                resolve();
            });

        });
    }

    this.update = function(slug, title, description, tags, image){

    }
    
    this.delete = function(slug){

    }

    this.getShowBySlug = function(slug){

        return new Promise((resolve, reject) => {
            
            col.find({slug : slug}).limit(1).toArray(function(err, docs){
                if(docs.length < 1){ console.log("couldn't find that"); reject(err); }
                else resolve(docs[0]);
            });
        });

    }

    this.getShowById = function(showID){
        return false;
    }

    this.getShowsAll = function(limit = 0, skip = 0){
        if(limit > 0){
            col.find({}).limit(limit).skip(skip)
        }
    }

    this.getShowsByTag = function(limit = 0, skip = 0){

    }

    this.getShowsByStringSearch = function(limit = 0, skip = 0){

    }

    this.getNumberOfShows = function(){
        return col.count()
    }

}

module.exports = ShowController;