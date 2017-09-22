let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);


let stats = require('docker-stats')
let through = require('through2')



let Docker = require('dockerode');
let DockerEvents = require('docker-events')
//let docker = new Docker({socketPath: '/var/run/docker.sock'});




io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', text: message});
  });


  var emitter = new DockerEvents({
    docker: new Docker({socketPath: '/var/run/docker.sock'}),
  });

  emitter.start();

  // ON CLIENT CONNECT
  emitter.on("connect", function() {
    console.log("connected to docker api");
    io.emit('message', {type:'new-message', text: "connected to docker api"});
  });

  // ON DOCKER CREATE
  emitter.on("create", function(message) {
    console.log("container created: %j", message);
    io.emit('message', {type:'new-message', text: "container created: %j", message });
    });


  // ON DOCKER START
  emitter.on("start", function(message) {
    console.log("container started: %j", message);
    io.emit('message', {type:'new-message', text:"container started: %j", message });
    });


  // ON DOCKER DIE
  emitter.on("stop", function(message) {
    console.log("container stopped: %j", message);
    io.emit('message', {type:'new-message', text:"container stopped: %j", message });
    });

  // ON DOCKER DIE
  emitter.on("die", function(message) {
    console.log("container died: %j", message);
    io.emit('message', {type:'new-message', text:"container died: %j", message });
    });


  // ON DOCKER DESTROY
  emitter.on("destroy", function(message) {
    console.log("container destroyed: %j", message);
    io.emit('message', {type:'new-message', text:"container destroyed: %j", message });
  });


 // STATS EVERY 1 SECS
  var opts = {   statsinterval: 10  } ;



  stats(opts).pipe(through.obj(function(chunk, enc, cb) {


    this.push(JSON.stringify(chunk));
    this.push('\n');
    io.emit('stats', {type:'new-message', text: chunk });

    console.log('\n\n###### STATS ######' );
    console.log(chunk);

    cb()
  }));

});



http.listen(5000, () => {
  console.log('started on port 5000');
});
