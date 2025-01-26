exports.init = function(io) {
    io.sockets.on('connection', function (socket) {
        try {
            socket.on('create or join', function (room, userId) {
                socket.join(room);
                io.sockets.to(room).broadcast.emit('joined', room, userId);
            });
            socket.on('message', function(room, userId, chatText) {
                socket.to(room).broadcast.emit('message', room, userId, chatText);
            })
            socket.on('disconnect', function (room,userID){
                console.log(`user ${userID} disconnected from ${room}`);
            })
        }
        catch (error) {
            console.log("error: " + error)
        }
    });
}