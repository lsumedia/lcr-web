
var shortid = require('shortid');
var request = require('request');

function EpisodeController(db, config, Shows){
    
        var col = db.collection('episodes');
    
        var _this = this;
        
        var episodeTypes = {
            "episode" : "Episode",
            "podcast" : "Podcast",
            "mix" : "DJ Mix",
            "update" : "News Update"
        }

        function validate(obj){

            var publishDate = (obj.publishTime)?  new Date(obj.publishTime) : new Date() ;
            var publishTime = publishDate.toISOString();

            var episode = {
                metafile : obj.metafile,
                title : obj.title || "",
                type : obj.type || null,
                description : obj.description || "",
                showSlug : obj.showSlug || "",
                tags : obj.tags || "",
                image : obj.image || "",
                public : obj.public,
                publishTime : obj.publishTime
            }
            return episode;
        }
    
        this.insert = function(obj){
    
            return new Promise((resolve, reject) => {

                var episode = validate(obj);
               
                episode._id = shortid.generate();
    
                col.insertOne(episode, function(err, r){
                    console.log('episode: Added new episode ' + episode._id);
                    resolve(episode);
                });
    
            });
    
        }
    
        this.update = function(id, obj){
    
            var episode = validate(obj);
    
            return new Promise((resolve, reject) => {
                
                col.update({_id: id}, episode, function(err, results){
                    if(err || (results.result.n == 0)){ 
                        reject(err); 
                        return;
                    }
                    else {
                        console.log("episode: Updated episode " + id);
                        resolve(episode);
                    }
                });
    
            });
        }
        
        this.delete = function(id){
            return new Promise((resolve, reject) => {
                
                col.deleteOne({_id: id}, function(err, results){
                    if(err || results.result.n == 0){ 
                        reject(err); 
                    }
                    else{
                        console.log("episode: Deleted episode " + id);
                        resolve();
                    }
                });
            });
        }
    
        this.getById = function(id){
            return new Promise((resolve, reject) =>
            { 
                col.find({_id : id}).limit(1).toArray(function(err, docs){
                    if(err){
                        reject(err);
                    }else if(docs.length == 0){
                        reject('No documents found');
                    }else{
                        var doc = docs[0];
                        request.get(doc.metafile, function(err, res, body){
                            if(err) console.error(err);
                            try{
                                doc.meta = JSON.parse(body);
                                resolve(doc);
                            }catch(err){
                                doc.meta = "Error gettings metadata: " + err.message;
                                resolve(doc);
                            }
                        });
                    }
                });
            });
        }
    
        this.getAll = function(limit = 0, skip = 0){
    
            return new Promise((resolve, reject) =>
            { 
                col.find({}).limit(limit).skip(skip).toArray(function(err, docs){
                    if(err) reject(err);
                    else resolve(docs);
                });
            });
        }

        this.getAllPublic = function(limit = 0, skip = 0){
            
            return new Promise((resolve, reject) =>
            { 
                col.find({public : true}).limit(limit).skip(skip).toArray(function(err, docs){
                    if(err) reject(err);
                    else resolve(docs);
                });
            });
        }

        this.getByShow = function(showSlug, limit = 0, skip = 0){
            return new Promise((resolve, reject) =>
            { 
                col.find({showSlug : showSlug}).limit(limit).skip(skip).toArray(function(err, docs){
                    if(err) reject(err);
                    else resolve(docs);
                });
            });
        }
    
        this.getByTag = function(tag, limit = 0, skip = 0){
            return new Promise((resolve, reject) =>
            { 
                col.find({tags : {'$regex' : tag}}).limit(limit).skip(skip).toArray(function(err, docs){
                    if(err) reject(err);
                    else resolve(docs);
                });
            });
        }
    
        this.getByStringSearch = function(string, limit = 0, skip = 0){
            
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
    
    module.exports = EpisodeController;