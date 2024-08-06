import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const Navbar = ({ searchHandle }) => {
  const usertype = localStorage.getItem('usertype');
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Product-Mart</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {usertype === 'Admin' ? (
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/addproduct">Add Product</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/cart">Cart</Link>
              </li>
            )}
          </ul>
            {isAuthenticated ? (
              <button className="btn btn-outline-danger my-2 mx-2" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link className="btn btn-outline-success my-2 mx-2" to="/login">Login</Link>
                <Link className="btn btn-outline-success my-2 mx-2" to="/signup">SignUp</Link>
              </>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
