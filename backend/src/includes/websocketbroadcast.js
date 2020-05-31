
function WebSocketBroadcast(wsServer){

    var connections;

    this.sendMessage = function(messageName, content){

        var message = JSON.stringify({
            type : messageName,
            payload : content
        });

        connections.forEach((connection) => {
            connection.sendUTF(message);
        });
    }

    wsServer.on('connect', function(connection){
        connections.push(connection);

        
    });

}

module.exports = WebSocketBroadcast;