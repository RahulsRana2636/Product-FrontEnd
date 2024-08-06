import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

const notifydata = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};
const successNotify = () =>
  toast.success("Product Updated Successfully!", notifydata);
const errNotify = () => toast.error("Product Not Updated!", notifydata);
const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const url = process.env.REACT_APP_API_URL + 'product/getproduct/' + id;
    try {
      const result = await axios.get(url,{
        headers: {
          authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
        },  
      });
      setName(result.data.name);
    setPrice(result.data.price);
    setCategory(result.data.category);
    setDescription(result.data.description);
    } catch (error) {
        console.log(error)
    }
    
  };

  const updateProduct = async () => {
    const url = process.env.REACT_APP_API_URL + 'product/updateproduct/'+ id;
      const result = await axios.put(url ,{ 
        name, price, category, description }
        ,{
          headers: {
            authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
          },
        });
    if (result) {
      successNotify();
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } else {
      errNotify();
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    errNotify();
  };
  const handleClickUpdate = () => {
    setShow(true);
  };
  const handleUpdateItem = () => {
    updateProduct();
    setShow(false);
  };
  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <button onClick={handleClickUpdate} className="btn btn-warning">
        Update Product
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm Update?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure you want to Update Product ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateItem}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default UpdateProduct;
