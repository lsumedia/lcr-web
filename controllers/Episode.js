

function EpisodeController(db){
    
        const slugMaker = require('slug');
    
        var col = db.collection('shows');
    
        var _this = this;
    
        this.insert = function(title, description, tags, image){
    
            return new Promise((resolve, reject) => {
    
                if(title.length < 5){  reject('Initial title must be at least 5 characters'); return; }
    
                var showSlug = slugMaker(title.toLowerCase());
                
                var newShow = {
                    title : title,
                    description : description,
                    tags : tags,
                    image : image,
                    slug: showSlug
                }
               
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
    
        this.update = function(slug, title, description, tags, image){
    
            var showObj = {
                title: title,
                description: description,
                tags : tags,
                image : image,
                slug : slug
            };
    
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
            return col.count()
        }
    
    }
    
    module.exports = ShowController;