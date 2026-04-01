import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import PageNotFound from '../../pages/PageNotFound';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';

export default function Index() {

  const userData = useSelector((state) => state.user)
  console.log("🚀 ~ file: index.js:13 ~ index ~ userData:", userData)

  return (
    <div>
        <Router>
            <Navbar user={userData} />
            <br/><br/><br/>
            <Routes>
                 <Route path= "/" element={<Home  />} />
                 <Route path= "/profil" element={<Profil  />} />
                 <Route path= "/trending" element={<Trending  />} />
                 <Route path= "*" element={<PageNotFound  />} />
            </Routes>
        </Router>
    </div>
  )
}
