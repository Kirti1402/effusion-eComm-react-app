import "./App.css";
import Mockman from "mockman-js";
import {Routes,Route} from "react-router-dom" 
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Mockman/>}/>
      </Routes>
    </div>
  );
}

export default App;
