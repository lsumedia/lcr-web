
function UtilityAPI(app, db, auth, Shows){
   
    app.get('/api/utility/currentshow', auth, function(req,res){
        res.send('you win!');
    });

    app.post('/api/utility/currentshow', auth, function(req, res){

    });

    app.delete('/api/utility/currentshow', auth, function(req,res){

    });

}

module.exports = UtilityAPI;