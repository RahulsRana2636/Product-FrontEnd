import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import store from './redux/store';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Navbar from './components/pages/Navbar';
import HomePage from './components/pages/HomePage';
import ProductList from './components/pages/ProductList';
import ProductDetails from './components/pages/ProductDetails';
import AddProduct from './components/Admin/AddProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import Footer from './components/pages/Footer';
import './App.css';
import CartList from './components/pages/CartList';

import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/actions/authActions';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    
    return (
        <Provider store={store}>
            <BrowserRouter>
           <Navbar searchHandle={ProductList.searchHandle} />
                {/* <ProductList /> */}
                <div className="App page-container content-wrap">
                    <Routes>
                <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/productdetail/:id" element={<ProductDetails />} />
                        <Route path="/addproduct" element={<AddProduct />} />
                        <Route path="/update/:id" element={<UpdateProduct />} />
                        <Route path="/cart" element={<CartList />} />
                    </Routes>
                </div>
                <Footer/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
