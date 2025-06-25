import React, { useContext, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg';
import { UserContext } from '../../Context/UserContext';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { CartContext } from '../../Context/CartContext';


export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const { setUserToken, userToken } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);


  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  return (
    <div className={`${styles.navbarContainer} ${isSticky ? styles.sticky : ''}`}>
    <nav className='navbar navbar-expand-lg'>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="freshmarket" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/brands">Brands</Link></li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
            {userToken ? (
              <>
                <Link className="nav-link position-relative" to="cart">
                  <i className="fas fa-shopping-cart text-success"></i>
                  {numOfCartItems > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-10px',
                      background: 'red',
                      color: 'white',
                      fontSize: '12px',
                      padding: '2px 6px',
                      borderRadius: '50%',
                    }}>
                      {numOfCartItems}
                    </span>
                  )}
                </Link>

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <FaUser size={20} color="#0aad0a" />
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center gap-2">
                  <i className="fab fa-facebook"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-tiktok"></i>
                  <i className="fab fa-youtube"></i>
                </li>
                <li className="nav-item">
                  <span onClick={logOut} className="nav-link cursor-pointer">Logout</span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-flex align-items-center gap-2">
                  <i className="fab fa-facebook"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-tiktok"></i>
                  <i className="fab fa-youtube"></i>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}
