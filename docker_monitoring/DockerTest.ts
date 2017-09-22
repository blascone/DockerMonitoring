let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let monitor = require('node-docker-monitor');








io.on('connection', (socket) => {
  console.log('user connected');


  monitor({
    onContainerUp: function(container) {
      console.log('Container up: ', container)
      io.emit('message', {type:'new-message', text: 'Container up: ' + JSON.stringify(container) });
    },

    onContainerDown: function(container) {
      console.log('Container down: ', container)
      io.emit('message', {type:'new-message', text: 'Container down: ' + JSON.stringify(container)});
    }
  });



  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', text: message});
  });
});



http.listen(5000, () => {
  console.log('started on port 5000');
});
