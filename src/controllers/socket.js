const socketConnection = (socket) => {
    socket.on('connection', (socket) => {
        console.log('we have a connection');
    })
}

module.exports = socketConnection;
