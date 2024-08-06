import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { addToCart } from "../../redux/actions/cartActions";
import img3 from '../../IMG/img3.jpg';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const fetchProductList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'product/products';
      const response = await axios.get(url, {
        headers: {
          authtoken: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProductList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const searchHandle = async (event) => {
    const key = event.target.value;

    if (key) {
      try {
        const url = process.env.REACT_APP_API_URL + `product/search/${key}`;
        const response = await axios.get(url, {
          headers: {
            authtoken: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProductList(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      fetchProductList();  // Fetch the full list if no search key
    }
  };

  const handleAddToCart = async (item) => {
    try {
      await dispatch(addToCart(item));
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  return (
    <div>
      <div className="container">
      <input className="form-control me-2 searchBar" type="search" placeholder="Search" aria-label="Search" onChange={searchHandle} style={{ width: '250px' }} />
        <div className="row">
          {productList && productList.length > 0 ? (
            productList.map((item) => (
              <div className="col-md-4" key={item._id}>
                <div className="card mb-4">
                  <img src={img3} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/productdetail/${item._id}`} className="no-underline">
                        {item.name}
                      </Link>
                    </h5>
                    <h6 className="card-price">Rs. {item.price}</h6>
                    <p className="card-text">{truncateText(item.description, 90)}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={`/productdetail/${item._id}`} className="btn btn-primary">
                        View Product
                      </Link>
                      <Button onClick={() => handleAddToCart(item)} className="btn btn-success mx-2">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No products available</h1>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
