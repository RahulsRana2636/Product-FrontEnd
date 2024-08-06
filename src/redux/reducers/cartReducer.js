import {
  FETCH_CART_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from '../actions/cartActions';

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload),
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload ? { ...product, quantity: product.quantity + 1 } : product
        ),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
