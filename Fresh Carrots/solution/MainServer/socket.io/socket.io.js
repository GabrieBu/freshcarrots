exports.init = function(io) {
    io.on('connection', function (socket) {
        try {
            socket.on('create or join', function (room, username) {
                socket.join(room);
            });
            socket.on('message', function(room, username, chatText, timestamp) {
                socket.to(room).emit('message', room, username, chatText, timestamp);
            })
            socket.on('image', function(room, username, image, timestamp) {
                socket.to(room).emit('image', room, username, image, timestamp);
            })
            socket.on('disconnect', function (room,username){
                console.log(`user ${username} disconnected from ${room}`);
            })
        }
        catch (error) {
            console.log("error: " + error)
        }
    });
}