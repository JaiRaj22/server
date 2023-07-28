import React from 'react'
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Register from './pages/register'
import Login from './pages/login'

const Privateroutes = () => {
  const isauth = false

  return <>{isauth ? <Outlet /> : <Navigate to='/login' />}</>
}

const Restrictedroutes = () => {
  const isauth = false

  return <>{!isauth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}

const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
 
      <Route element={<Privateroutes />}>
      <Route path='/dashboard' element={<Dashboard />} />
      </Route>
  
      <Route element={<Restrictedroutes />}>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App