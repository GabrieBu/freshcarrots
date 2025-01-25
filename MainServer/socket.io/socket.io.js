
/*sulle slide vi sono 2 tipi diversi */


exports.init = function(io) {
    io.sockets.on('connection', function (socket) {
        try {

            /** it creates or joins a room */
            socket.on('create or join', function (room, userId) {
                socket.join(room);
                io.sockets.to(room).emit('joined', room, userId);
            });
            socket.on('chat', function (room, userId, chatText) {
                io.sockets.to(room).emit('chat', room, userId, chatText);
            });
            
            socket.on('message', function(room, userId, chatText) {
                socket.emit('message', room, userId, chatText);
            })
            /*oppure*/
            socket.on('sendchat', function (data) {
                io.sockets.in(socket.room).emit
                ('updatechat', socket.username,data);
            });


                socket.on('disconnect', function (room,userID)
            {
                console.log('user disconnected');
                /*USER disconnects itself independently when he exit the page of the chat
                * */
            })
        }
        catch (error) {

        }
    });
}