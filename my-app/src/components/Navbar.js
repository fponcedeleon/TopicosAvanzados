/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useHistory } from "react-router-dom";
import { removeSession } from "../scripts/utils/session.js";

const Navbar = ({ isAuthenticated, isAdmin }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const history = useHistory();
  const logout = () => {
    removeSession();
    history.push("/");
    window.location.reload();
  }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            TRVL
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            { isAuthenticated &&
              <React.Fragment>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
                <li className='nav-item'>
              <Link
                to='/voting'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Votacion
              </Link>
            </li>
            {isAdmin &&
              <li className='nav-item'>
                <Link
                  to='/election'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Eleccion
                </Link>
              </li>
            }
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={logout}
              >
                Log Out
              </Link>
            </li>
              </React.Fragment>
            }

            { !isAuthenticated &&
              <React.Fragment>
                <li className='nav-item'>
              <Link
                to='/login'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/register'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Register
              </Link>
            </li>
              </React.Fragment>
            }
            
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;