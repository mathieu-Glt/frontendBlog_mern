import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UidContext } from './AppContext'
import Logout from './Log/Logout'
import { useSelector } from 'react-redux'

export default function Navbar({ user }) {
    console.log("🚀 ~ file: Navbar.js:8 ~ Navbar ~ user:", user)
    const uid = useContext(UidContext)
    // const userData = useSelector((state) => state.user)
    // console.log("🚀 ~ file: Navbar.js:10 ~ Navbar ~ userDataRedux:", userData)
    if(uid !== null) {
        console.log("🚀 ~ file: Navbar.js:8 ~ Navbar ~ uid:", uid.user.pseudo)
    }


  return (
    <nav>
    <div className='nav-container'>
        <div className='logo'>
            <NavLink  to="/">
                <div className='logo'>
                    <img src='./img/tag.png' alt='icon'/>
                    <h3>Raccoont</h3>
                </div>
            </NavLink>
        </div>
        {uid ? (
            <ul>
                <li></li>
                <li className='welcome'>
                    <NavLink  to="/profil">
                        <h5>Bienvenue {uid.user.pseudo} !</h5>
                    </NavLink>
                </li>
                <Logout/>
            </ul>
        ) : (
            <ul>
                <li></li>
                <li>
                    <NavLink  to="/profil"></NavLink>
                    <img src='./img/icons/login.svg' alt='logo'/>
                </li>
            </ul>
        )}
    </div>

    </nav>
  )
}

