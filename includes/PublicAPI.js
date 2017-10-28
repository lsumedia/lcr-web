
function PublicAPI(app, db, Shows){

    app.get('/api/public/show/:slug', function(req, res, next){
        Shows.getShowBySlug(req.params.slug).then(function(show){
            res.send(show);
        });
    });
    
    app.get('/api/public/show/all', function(req, res, next){
        Show.getShowsAll().then(function(shows){

        });
    });
}

module.exports = PublicAPI;