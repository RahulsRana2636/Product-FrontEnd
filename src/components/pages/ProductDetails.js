import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import {  useSelector,useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addToCart } from "../../redux/actions/cartActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img2 from '../../IMG/img2.jpg';
import img3 from '../../IMG/img3.jpg';
import img4 from '../../IMG/img4.jpg';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setproduct] = useState([]);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const callApiproduct = async () => {
        try {
        const url= process.env.REACT_APP_API_URL + 'product/getproduct/' +id;
        const response = await axios.get(url,{
          headers: {
            authtoken: `Bearer ${localStorage.getItem('token')}`,
          },
        });
          setproduct(response.data);
        }
        catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
        callApiproduct();
      }, [])

      const handleAddToCart = async (item) => {
        try {
          await dispatch(addToCart(item));
        } catch (error) {
        }
      };
  return (
    <>
     {isAuthenticated ?
       <div className="container my-4">
       <div className="p-5 mb-4 bg-light rounded-3">
         <div className="row">
           <div className="col-md-6">
             <div className="row">
               <div className="col-6 mb-4">
                 <img src={img2} className="img-fluid" alt="Product Image 1" />
               </div>
               <div className="col-6 mb-4">
                 <img src={img3} className="img-fluid" alt="Product Image 2" />
               </div>
               <div className="col-6 mb-4">
                 <img src={img4} className="img-fluid" alt="Product Image 3" />
               </div>
               <div className="col-6 mb-4">
                 <img src={img2} className="img-fluid" alt="Product Image 4" />
               </div>
             </div>
           </div>
           <div className="col-md-6">
             <div className="container-fluid py-5">
               <h1 className="display-5 fw-bold">{product.name}</h1>
               <h3 className="display-5">Rs. {product.price}</h3>
               <p className="col-md-8 fs-4">{product.description}</p>
               <Button onClick={() => handleAddToCart(product)} className="btn btn-success mx-2">Add to Cart</Button>
             </div>
           </div>
         </div>
       </div>
     </div>
 
  :        
   <div class="container">
    <p class="lead">You are not logged in. Please login to be able to see details about product</p>
  </div>
  }
  <ToastContainer />
    </>
  )
}

export default ProductDetails
