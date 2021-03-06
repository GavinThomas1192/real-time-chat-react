const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const port = process.env.PORT || 4001;
const index = require('./routes/index');
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

io.on('connection', socket => {
  console.log('New client connected'), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const getApiAndEmit = async socket => {
 try {
   const res = await axios.get(
     "https://api.darksky.net/forecast/APIKEYHERE/47.6062,122.3321"
   ); 
   console.log('Got info, emitting data');
   socket.emit("FromAPI", res.data.currently); // Emitting a new message. It will be consumed by the client
 } catch (error) {
   console.error(`Error: ${error.code}`);
 }
};


server.listen(port, () => console.log(`Listening on port ${port}`));
