// =============================================================================
// socket io implement =============================================================
// =============================================================================
// Initialize a new socket.io application, named 'chat'

module.exports = function (app, io) {

    var chat = io.on('connection', function (socket) {
        console.log("connection established");

        // When the client emits the 'load' event, reply with the
        // number of people in this chat room

        socket.on('load', function (data) {
            console.log("loading");

            var room = findClientsSocket(io, data);
            if (room.length === 0) {
                console.log("0 ppl in chat");
                socket.emit('peopleinchat', {
                    number: 0
                }); // only you there, leave a message
                socket.join(data.id);
            } else if (room.length === 1) {
                console.log("1 ppl in chat");
                socket.emit('peopleinchat', {
                    number: 1
                }); // already someone there, chat with him/her

                socket.join(data.id);
                console.log("chat starts");
                chat.in(data.id).emit('startChat', {
                    boolean: true,
                    id: data.id
                });
            }
        });


        // Somebody left the chat
        socket.on('disconnect', function () {
            console.log("recv disconnect");
            // Notify the other person in the chat room
            // that his partner has left
            socket.broadcast.to(this.room).emit('leave', {
                boolean: true,
                room: this.room
            });
            // leave the room
            socket.leave(socket.room);
        });

        // Handle the sending of messages
        socket.on('msg', function (data) {
            // When the server receives a message, it sends it to the other person in the room.
            socket.broadcast.to(socket.room).emit('receive', {
                msg: data.msg,
                img: data.img
            });
        });
    });
};

function findClientsSocket(io, roomId, namespace) {
    var res = [],
        ns = io.of(namespace || "/"); // the default namespace is "/"

    if (ns) {
        for (var id in ns.connected) {
            if (roomId) {
                var index = ns.connected[id].rooms.indexOf(roomId);
                if (index !== -1) {
                    res.push(ns.connected[id]);
                }
            } else {
                res.push(ns.connected[id]);
            }
        }
    }
    return res;

}
