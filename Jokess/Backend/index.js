//LEARNING TO CONNECT FONTEND TO BACKEND

import express from "express";

const app = express()

const port = 4000;

app.get("/api/jokes",(req,res)=>{
    const jokes = [
        {
          id: 1,
          title: "The Programmer's Frustration",
          content: "Why do programmers prefer dark mode? Because light attracts bugs!"
        },
        {
          id: 2,
          title: "Foodie's Wish",
          content: "What’s a computer’s favorite snack? Microchips!"
        },
        {
          id: 3,
          title: "Logic Gone Wrong",
          content: "Why do Java developers wear glasses? Because they don’t C#."
        },
        {
          id: 4,
          title: "Overthinking It",
          content: "How do you comfort a JavaScript bug? You console it!"
        },
        {
          id: 5,
          title: "Keep It Cool",
          content: "Why was the developer always calm? Because they had a lot of cache."
        },
        {
          id: 6,
          title: "Null Problems",
          content: "Why was the computer cold? It left its Windows open."
        },
        {
          id: 7,
          title: "Error 404",
          content: "What did the router say to the doctor? It hurts when IP!"
        },
        {
          id: 8,
          title: "Object-Oriented Fun",
          content: "Why did the object go to therapy? It had too many unresolved properties!"
        },
        {
          id: 9,
          title: "HTML Humor",
          content: "Why was the HTML file so happy? It got a new <body>!"
        },
        {
          id: 10,
          title: "Networking Woes",
          content: "Why do networks never gossip? They prefer to keep things private."
        }
      ];
      
    
      res.send(jokes)
})


app.listen(port,()=>{
    console.log(`the server is running on PORT : ${port}`);
    
})