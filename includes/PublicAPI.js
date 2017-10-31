const request = require('request');

function PublicAPI(app, db, Shows){


    app.get('/api/public/show/all', function(req, res){
        Shows.getShowsAll().then(function(shows){
                res.send(shows);
            },function(){
                res.status(404).send('Not found');
            });
    });
    
    app.get('/api/public/show/:slug', function(req, res){
        Shows.getShowBySlug(req.params.slug).then(function(show){
            res.send(show);
        },function(){
            res.status(404).send('Not found');
        });
    });

    app.get('/api/public/episode/byshow/:slug', function(req,res){

    });

    app.get('/api/public/episode/id', function(req,res){

    });

    app.get('/api/public/nowplaying', function(req,res){
        request('http://ice.lsu.co.uk:8080/status-json.xsl').pipe(res);
    });
}

module.exports = PublicAPI;