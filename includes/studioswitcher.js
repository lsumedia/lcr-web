

function StudioSwitcher(webSocketBroadcast){

    this.id = 1;
    var inputs = [null, "Sustain", "Studio 1", "Studio 2", "Luci Live"];

    var connections;

    this.set = function(id){
        this.id = 1;
        this.updateWS();
    }

    this.get = function(id){
        return this.id;
    }

    this.updateWS = function(){
        webSocketBroadcast.send('switcher', { 
            id : this.id
        });
    }

}

module.exports = StudioSwitcher;