

import { TodoProvider } from "./Context/todoContext";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <TodoProvider>
      
      <div className="App">
      <HomePage/>
        
      </div>
    </TodoProvider>
  );
}

export default App;
