// const socketIO = require('socket.io');

// // Export a function that takes the HTTP server instance as an argument
// module.exports = (server) => {
//   const io = socketIO(server);

//   // Set up Socket.IO to listen for connections
//   io.on('connection', (socket) => {
//     console.log('Client connected');

//     // Handle disconnections
//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });

//     // Handle new event creation
//     socket.on('newEvent', (event) => {
//       // Emit a new notification to all connected clients
//       io.emit('newNotification', {
//         message: `New event created: ${event.title}`,
//         userId: socket.handshake.query.userId,
//         eventId: event._id
//       });
//     });
//   });

//   return io;
// };