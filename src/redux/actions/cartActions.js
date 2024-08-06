import axios from 'axios';
import { toast } from 'react-toastify';

const notifydata = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const successNotify = (message) => toast.success(message, notifydata);
const errorNotify = (message) => toast.error(message, notifydata);

export const FETCH_CART_PRODUCTS = 'FETCH_CART_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

// Other action creators...

export const fetchCartProducts = () => async (dispatch) => {
  const userId = localStorage.getItem('userid');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    errorNotify("User not authenticated");
    return;
  }

  try {
    const url = process.env.REACT_APP_API_URL + `cart/view-cart/${userId}`;
    const response = await axios.get(url, {
      headers: {
        authtoken: `Bearer ${token}`,
      },
    });

    dispatch({
      type: FETCH_CART_PRODUCTS,
      payload: response.data,
    });
  } catch (error) {
    errorNotify("Failed to fetch cart products");
  }
};

export const addToCart = (data) => async (dispatch) => {
  const userId = localStorage.getItem('userid');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    errorNotify("User not authenticated");
    return;
  }

  try {
    const { name, price } = data;
    const updatedData = { name, price, userId };
    const url = process.env.REACT_APP_API_URL + `cart/add-to-cart`;
    await axios.post(url, updatedData, {
      headers: {
        authtoken: `Bearer ${token}`,
      },
    });

    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });

    successNotify("Product added to the cart!");
  } catch (error) {
    errorNotify("Failed to add product to cart");
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');

  if (!token) {
    errorNotify("User not authenticated");
    return;
  }

  try {
    const url = process.env.REACT_APP_API_URL + `cart/remove-from-cart/${id}`;
    await axios.delete(url, {
      headers: {
        authtoken: `Bearer ${token}`,
      },
    });

    dispatch({
      type: REMOVE_FROM_CART,
      payload: id,
    });

    successNotify("Product removed from the cart!");
  } catch (error) {
    errorNotify("Failed to remove product from cart");
  }
};

export const increaseQuantity = (productId) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');

  if (!token) {
    errorNotify("User not authenticated");
    return;
  }

  try {
    const state = getState();
    const product = state.cart.products.find(product => product._id === productId);

    if (product) {
      const url = process.env.REACT_APP_API_URL + `cart/update-quantity/${productId}`;
      await axios.put(url, { quantity: product.quantity + 1 }, {
        headers: {
          authtoken: `Bearer ${token}`,
        },
      });

      dispatch({
        type: INCREASE_QUANTITY,
        payload: productId,
      });

      successNotify("Product quantity increased!");
    }
  } catch (error) {
    errorNotify("Failed to increase product quantity");
  }
};

export const decreaseQuantity = (productId) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');

  if (!token) {
    errorNotify("User not authenticated");
    return;
  }

  try {
    const state = getState();
    const product = state.cart.products.find(product => product._id === productId);

    if (product && product.quantity > 1) {
      const url = process.env.REACT_APP_API_URL + `cart/update-quantity/${productId}`;
      await axios.put(url, { quantity: product.quantity - 1 }, {
        headers: {
          authtoken: `Bearer ${token}`,
        },
      });

      dispatch({
        type: DECREASE_QUANTITY,
        payload: productId,
      });

      successNotify("Product quantity decreased!");
    }
  } catch (error) {
    errorNotify("Failed to decrease product quantity");
  }
};
