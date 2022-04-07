const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const { Socket } = require("socket.io");

const io = require("socket.io")(server, {
    cors:{
        origin:"*",
        methodes:["GET","POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;
 app.get("/", (req, res)=>{
     res.send('server is running');
 });

 io.on('connection' , (Socket)=>{
     Socket.emit('me',Socket.id);

     Socket.on('disconnet',()=>{
         Socket.broadcast.emit("Callended");
     });
     Socket.on("calluser",({userTocall, signalData, from, name})=>{
         io.to(userTocall).emit("calluser", { signal: signalData, from, name});
     });
     Socket.on("answercall",(data)=>{
         io.to(data.to).emit("callaccepted", data.signal);

     })
 })

 server.listen(PORT,() => console.log('server listening on '))