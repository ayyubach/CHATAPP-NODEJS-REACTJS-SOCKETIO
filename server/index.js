const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const {addUser,removeUser,getUser,getUsers,checkExistedUser} = require('./users.js')
app.use(cors());


const io = socketio(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }});

io.on('connect',(socket)=>{
  let _id ;
  socket.on('join',({id,username,room})=>{
    _id=id;
    addUser(username,room,id);
    socket.join(room);
      socket.emit('message',{user:'Admin' ,message:`Welcome ${username} to ${room}`});
      socket.broadcast.to(room).emit('message', { user: username ,join:` ${username} joined ${room}` });
  });

  socket.on('sendMessage', ({message,username,room,id})=>{
    socket.broadcast.to(room).emit('message', { user: username , message: `${message}` });
  })

  socket.on('disconnect', async () => {
    const users = getUsers();
    user = await users.find(user=>user.id==_id)
    io.to(user.room).emit('message', { user: 'admin', message: `${user.username} has disconnected!` });
      removeUser(user.username);
  
     

 })

})  

app.get(`/getuser/:username/`,(req,res)=>{
  const user = checkExistedUser(req.params.username);
  res.send(user);
})

app.post(`/getuser/`,(req,res)=>{

  const users = removeUser(req.body.username);
  res.send(users);
})
    
server.listen( 5000, () => console.log(`Server has started.`));