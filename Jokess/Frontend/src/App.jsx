import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




function App() {
  const [jokes, setJokes] = useState([])


  useEffect(()=>{
      axios.get("/api/jokes") ///axios connect backend port
      .then((res)=>{
          setJokes(res.data)
      })
      .catch((error)=>{
        console.log(error);
        
      })
  })

  return (
    <div>
        <h1>NO. OF JOKES : {jokes.length}</h1>

        {
          jokes.map((joke,index)=>(
            <div key={joke.id}>
              <h2>{joke.title}</h2>
              <br />
              <p>{joke.content}</p>
            </div>
          ))
        }
    </div>
  )
}

export default App
