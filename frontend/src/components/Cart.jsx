import React from 'react';
import { useAppContext } from '../context/AppContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    getCartTotal, 
    clearCart 
  } = useAppContext();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h2>Your Cart</h2>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <a href="/" className="continue-shopping">Continue Shopping</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart ({cart.length} items)</h2>
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>
        
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>
              
              <div className="item-details">
                <h3>{item.title}</h3>
                <p className="item-price">{item.price}</p>
                <p className="item-availability">{item.availability}</p>
              </div>
              
              <div className="quantity-controls">
                <button 
                  onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  <FaMinus />
                  <span className="btn-text">-</span>
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  <FaPlus />
                  <span className="btn-text">+</span>
                </button>
              </div>
              
              <div className="item-total">
                £{(parseFloat(item.price.replace('£', '')) * item.quantity).toFixed(2)}
              </div>
              
              <button 
                onClick={() => removeFromCart(item._id)}
                className="remove-btn"
              >
                <FaTrash />
                <span className="btn-text">×</span>
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="summary-details">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>£{getCartTotal()}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>£{getCartTotal()}</span>
            </div>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
