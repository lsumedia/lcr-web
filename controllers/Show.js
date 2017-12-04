

function ShowController(db){

    const slugMaker = require('slug');

    var col = db.collection('shows');

    var _this = this;

    function validate(obj){
        return {
            title : obj.title,
            description : obj.description,
            tags : obj.tags,
            image : obj.image,
            slug: obj.slug,
            active : obj.active       //If active=false, show should still display in page, just not in recorder interface
        }
    }

    this.insert = function(obj){

        return new Promise((resolve, reject) => {

            var newShow = validate(obj);

            if(newShow.title.length < 5){  reject('Initial title must be at least 5 characters'); return; }

            var showSlug = slugMaker(newShow.title.toLowerCase());

            newShow.slug = showSlug;
           
            col.find({slug : showSlug}).toArray(function(err, docs){

                if(docs.length > 0){

                    col.update({slug : showSlug}, newShow, function(err, result){
                        if(err) reject(err);
                        else{ 
                            console.log("show: Updated show " + showSlug); 
                            resolve(newShow);
                        }
                    });

                }else{

                    col.insertOne(newShow, function(err, r){
                        console.log('show: Added new show ' + newShow.title);
                        resolve(newShow);
                    });

                }
            });

        });

    }

    this.update = function(slug, obj){

        var showObj = validate(obj);
        showObj.slug = slug;

        return new Promise((resolve, reject) => {
            
            col.update({slug: slug}, showObj, function(err, results){
                if(err || results.result.n == 0){ 
                    reject(err); return; 
                }
                else {
                    console.log("show: Updated show " + slug);
                    resolve(showObj);
                }
            });

        });
    }
    
    this.delete = function(slug){
        return new Promise((resolve, reject) => {
            
            col.deleteOne({slug: slug}, function(err, results){
                if(err || results.result.n == 0){ reject(err); return; }
                else{
                    console.log("show: Deleted show " + slug);
                    resolve();
                }
            });
        });
    }

    this.getShowBySlug = function(slug){

        return new Promise((resolve, reject) => {
            
            col.find({slug : slug}).limit(1).toArray(function(err, docs){
                if(docs.length < 1 || err){ reject(err); return; }
                else resolve(docs[0]);
            });
        });

    }

    this.getShowById = function(showID){
        return false;
    }

    this.getShowsAll = function(limit = 0, skip = 0){

        return new Promise((resolve, reject) =>
        { 
            col.find({}).limit(limit).skip(skip).toArray(function(err, docs){
                if(err) reject(err);
                else resolve(docs);
            });
        });
    }

    this.getShowsByTag = function(limit = 0, skip = 0){

    }

    this.getShowsByStringSearch = function(limit = 0, skip = 0){

    }

    this.getNumberOfShows = function(){
        return new Promise((resolve, reject) => {
            col.find({}).count((err, count) => {
                if(err) reject(err);
                resolve({
                    count: count
                });
            });
        });
    }

}

module.exports = ShowController;