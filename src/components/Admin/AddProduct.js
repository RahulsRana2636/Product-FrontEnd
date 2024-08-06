import React from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const notifydata = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  }
  const successNotify = () => toast.success("Product Added Successfully!", notifydata);
  const errNotify = () => toast.error("Product not Added!", notifydata);
const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [error,setError] = React.useState(false);
    const navigate = useNavigate();
    const addProduct = async (e) => {
        e.preventDefault();
        if(!name || !price || !description || !category)
        {   errNotify();
            setError(true);
            return false
        }
        try {
            const token = localStorage.getItem("token"); 
            const url= process.env.REACT_APP_API_URL + 'product/add-product';
            const result = await axios.post(url,
                { name, price, category, description },
                {
                    headers: {
                      authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
                    },
                  })

            if (result.status === 200) {
                successNotify();
                setTimeout(() => {
                    navigate('/');
                }, 1200);
            }
        } catch (error) {
            console.error("There was an error adding the product!", error);
        }
    }
       
    return (
        <div className='product'>
        <h1>Add Product</h1>
        <input type="text" placeholder='Enter product name' className='inputBox'
            value={name} onChange={(e) => { setName(e.target.value) }}
        />
        {error && !name && <span className='invalid-input'>Enter valid name</span>}

        <input type="text" placeholder='Enter product price' className='inputBox'
            value={price} onChange={(e) => { setPrice(e.target.value) }}
        />
        {error && !price && <span className='invalid-input'>Enter valid price</span>}

        <input type="text" placeholder='Enter product category' className='inputBox'
            value={category} onChange={(e) => { setCategory(e.target.value) }}
        />
        {error && !category && <span className='invalid-input'>Enter valid category</span>} 

        <textarea type="text" placeholder='Enter product description' className='inputBox'
            value={description} onChange={(e) => { setDescription(e.target.value) }}
        />
        {error && !description && <span className='invalid-input'>Enter valid description</span>}


        <button onClick={addProduct} className='appButton'>Add Products</button>
        <ToastContainer />
    </div>
    )
}

export default AddProduct;