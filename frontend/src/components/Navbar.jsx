import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import menu from '../assets/icon/menu.png'

const Navbar = () => {

    let navigate = useNavigate()

    let username = localStorage.getItem('username')

    let handleMenu = () => {
        const navbar = document.querySelector('.navbar')
        navbar.classList.toggle("active")
    }

    let onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/')
        window.location.reload()
    }

    let token = localStorage.getItem('token')


    return (
        <div className="nav">
            <div className="three-line-menu" onClick={handleMenu}>
                <img style={{height:25, width:25}} src={menu} alt=""/>
            </div>
            <div className='navbar'>
                { token ?
                <>
                    <NavLink to='/'>Contact</NavLink>
                    <NavLink to={`/profile/${username}`}>Profile</NavLink>
                    <NavLink onClick={onLogout} style={{backgroundColor: 'red'}}>Logout</NavLink>
                </> :
                
                <>
                    <NavLink to='/signup'>Signup</NavLink>
                    <NavLink to='/login'>Login</NavLink>
                </>
}
            </div>
        </div>
    )
}

export default Navbar