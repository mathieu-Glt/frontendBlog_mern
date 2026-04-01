import React from 'react'
import { NavLink } from 'react-router-dom'


export default function LeftNav() {
    return (
        <div>
            <div className='left-nav-container'>
                <div className='icons'>
                    <div className='icons-bis'>
                        <NavLink to="/" activeClassName="active-left-nav" >
                            <img src="./img/icons/home.svg" alt='home' />
                        </NavLink>
                        <br />
                        <NavLink to="/trending" activeClassName="active-left-nav" >
                            <img src="./img/icons/rocket.svg" alt='rocket' />
                        </NavLink>
                        <br />
                        <NavLink to="/profil" activeClassName="active-left-nav" >
                            <img src="./img/icons/user.svg" alt='user' />
                        </NavLink>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}
