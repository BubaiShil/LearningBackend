import {Server} from 'socket.io'
import http from 'http'
import express from 'express'



const app =express()
const server = http.createServer(app)

const io = new Server(server,{
    cors :{
        origin: ['http://localhost:5173']
    },
})

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id)

    socket.on("disconnected",()=>{
        console.log("Auser disconnected",socket.id);
        
    })
})


export {io,Server,app}