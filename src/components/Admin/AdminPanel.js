import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifydata = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const successNotify = () => toast.success("Product deleted Successfully!", notifydata);
const successNotify1 = () => toast.success("Product added to cart", notifydata);
const errNotify = () => toast.error("Product not deleted!", notifydata);

const AdminPanel = () => {
  const [productList, setProductList] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const callApiProductList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'product/products';
      const response = await axios.get(url, {
        headers: {
          authtoken: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProductList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApiProductList();
  }, []);

  const deleteProduct = async (id) => {
    try {
      if (id) {
        const url = process.env.REACT_APP_API_URL + 'product/deleteproduct/' + id;
        await axios.delete(url, {
          headers: {
            authtoken: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        successNotify();
        callApiProductList();
      } else {
        errNotify();
      }
    } catch (err) {
      console.log(err);
      errNotify();
    }
  };

  const handleClose = () => {
    setShow(false);
    errNotify();
  };
  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  const handleDeleteItem = () => {
    deleteProduct(deleteId);
    setShow(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
        {productList && productList.length > 0 ? (
            productList.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4">
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title"><Link to={"/productdetail/" + item._id}className="no-underline">{item.name}</Link></h5>
                    <h6 className="card-price">Rs. {item.price}</h6>
                    <p className="card-text">{truncateText(item.description, 90)}</p>
                    <Link to={"/productdetail/" + item._id} className="btn btn-primary">View Product</Link>
                    <div className="d-flex justify-content-end">
                      <Link to={"/update/" + item._id} className="edit"><i className="fas fa-pen-square mx-3"></i></Link>
                      <button onClick={() => handleClickDelete(item._id)} className="delete"><i className="fas fa-trash"></i></button>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure you want to delete product?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteItem}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default AdminPanel;
