

class WebSocketBroadcast {

    constructor(){

    }

    private connections;

    public sendMessage = function(messageName: string, content: any){

        var message = JSON.stringify({
            type : messageName,
            payload : content
        });

        this.connections.forEach((connection) => {
            connection.sendUTF(message);
        });
    }

    wsServer.on('connect', function(connection){
        connections.push(connection);
    });

}

module.exports = WebSocketBroadcast;