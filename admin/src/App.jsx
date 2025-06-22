import React from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import { Route, Routes } from 'react-router-dom'
import AddItems from './pages/Add/add'
import ItemList from './pages/List/list'
import Order from './pages/Order/order'

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL
  return (
    <div>
      <Navbar />
      <hr className='' />
      <div className="flex justify-between w-full">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[80%]">
        <Routes>
        <Route path="/add" element={<AddItems url={url}/>} />
        <Route path="/list" element={<ItemList url={url}/>} />
        <Route path="/orders" element={<Order url={url}/>} />
      </Routes>
        </div>
      </div>
      
    </div>
  )
}

export default App