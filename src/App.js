import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Product from './pages/Product';
import ProductView from './components/ProductView';
import Register from './pages/Register';
import Cart from './pages/Cart'
import UserOrder from './pages/UserOrder';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Admin from './pages/AdminDashboard'
import Error from './pages/Error'
import './App.css';
import {UserProvider} from './UserContext'

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null,

  })
  const unsetUser = () => {

    localStorage.clear();
  }

  useEffect(()=> {

    fetch('http://localhost:4000/users/profile', {
      headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {

      if(typeof data.accessToken !=="undefined"){
        setUser({
          id:data._id,
          isAdmin:data.isAdmin
        })
      } else (
        setUser({
          id:null,
          isAdmin:null
        })

        )

    })


  },[])



  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
     
      <AppNavBar/>
      
      <Routes>
          <Route exact path = "/" element ={<Home/>}/>
          <Route exact path = "/products" element ={<Product/>}/>
          <Route exact path = "/products/:productId" element ={<ProductView/>}/>
          <Route exact path = "/register" element ={<Register/>}/>
          <Route exact path = "/myorders" element ={<UserOrder/>}/>
          
          <Route exact path = "/cart" element ={<Cart/>}/>
          <Route exact path = "/login" element ={<Login/>}/>
          <Route exact path = "/logout" element={<Logout/>}/>
          <Route exact path = "/admin" element ={<Admin/>}/>
          <Route exact path= "*" element ={<Error/>}/>
      </Routes>
     

       </Router>
       </UserProvider>

    

    )
  
}

export default App;
