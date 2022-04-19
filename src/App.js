import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Product from './pages/Product';
import ProductView from './components/ProductView';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
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
          <Route exact path = "/login" element ={<Login/>}/>
          <Route exact path = "/logout" element={<Logout/>}/>
      </Routes>
     

       </Router>
       </UserProvider>

    

    )
  
}

export default App;
