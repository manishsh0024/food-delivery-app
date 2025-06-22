import React, { useState } from 'react'
import Navbar from './components/navbar/navbar'
import { Routes , Route} from 'react-router-dom'
import Home from './pages/homepage/home'
import Cart from './pages/cart/cart'
import Placeorder from './pages/placeorder/placeorder'
import Footer from './components/footer/footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import VerifyPayment from './pages/verify/verifyPayment'
import Myorder from './pages/myOrders/myorders'

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : null}
      <Navbar setShowLogin = {setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPopUp />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Placeorder />} />
        <Route path='/verify' element={<VerifyPayment />} />
        <Route path='/myorder' element={<Myorder />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App