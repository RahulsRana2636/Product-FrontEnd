import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartProducts,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions/cartActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartList = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cart.products);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartProducts());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const totalSum = cartProducts.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="cart-container">
            <div className="cart-header">Cart summary</div>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.length > 0 ? (
                  cartProducts.map((item) => (
                    <tr key={item._id}>
                      <td className="product-details">
                        <img
                          className="product-image"
                          src="tray-table-black.jpg"
                          alt="image"
                        />
                        <span className="product-name">{item.name}</span>
                      </td>
                      <td className="quantity">
                        <button
                          className="quantity-button"
                          onClick={() => handleDecreaseQuantity(item._id)}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="quantity-button"
                          onClick={() => handleIncreaseQuantity(item._id)}
                        >
                          +
                        </button>
                      </td>
                      <td className="price">{item.price}</td>
                      <td>
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No products found in the cart</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="cart-summary">
            <p>Subtotal: ${totalSum.toFixed(2)}</p>
            <p>Express shipping: +$15.00</p>
            <p className="total">Total: ${(totalSum + 15).toFixed(2)}</p>
            <a href="checkout.html" className="checkout-button">
              Checkout
            </a>
          </div>
          <div className="coupon-section">
            <p>Have a coupon?</p>
            <input
              type="text"
              className="coupon-input"
              placeholder="Add your code for an instant cart discount"
            />
            <button className="apply-button">Apply</button>
          </div>
        </>
      ) : (
        <div className="container">
          <p className="lead">You are not logged in. Please login to be able to see cart</p>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default CartList;
