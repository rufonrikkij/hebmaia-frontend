import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from "./components/Header";
// import './App.css'
import './assets/Style.css'
import { BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div data-testid="app-routes" >
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        {/* <Route path="/home" element={<HomePage/>} />
        <Route path="/menu2" element={<MenuPage/>} />
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>
        <Route path="/cart" element={<CartPage/>}/> */}
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
