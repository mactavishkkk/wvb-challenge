import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './pages/Logon'
import Register from './pages/Register'

import Home from './pages/User/Home'
import Create from './pages/User/Create'
import Edit from './pages/User/Edit'
import Details from './pages/User/Details'
import Charts from './pages/User/Charts'

import HomeDevice from './pages/Device/Home'
import CreateDevice from './pages/Device/Create'
import EditDevice from './pages/Device/Edit'
import DetailsDevice from './pages/Device/Details'
import ChartsDevice from './pages/Device/Charts'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route exact path="/user/home" element={<Home />} />
        <Route path="/user/create" element={<Create />} />
        <Route path="/user/edit/:id" element={<Edit />} />
        <Route path="/user/details/:id" element={<Details />} />
        <Route path="/user/charts" element={<Charts />} />

        <Route exact path="/device/home" element={<HomeDevice />} />
        <Route path="/device/create" element={<CreateDevice />} />
        <Route path="/device/edit/:id" element={<EditDevice />} />
        <Route path="/device/details/:id" element={<DetailsDevice />} />
        <Route path="/device/charts" element={<ChartsDevice />} />
      </Routes>
    </Router>
  );
}

export default App;