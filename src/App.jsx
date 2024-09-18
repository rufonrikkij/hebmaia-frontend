import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from "./components/Header";
import './assets/Style.css'
import { BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import '../server'

function App() {
  const [count, setCount] = useState(0)
  app.use(cors());
  return (
    <div data-testid="app-routes" >
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
