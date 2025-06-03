import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // 1) Calculate the total cost of all items in the cart
  const calculateTotalAmount = () => {
    // Sum up each item’s subtotal (cost × quantity)
    const total = cart.reduce((acc, item) => {
      // Extract numeric value from item.cost (e.g. "$12.50" → 12.50)
      const unitPrice = parseFloat(item.cost.substring(1));
      return acc + unitPrice * item.quantity;
    }, 0);

    // Format to two decimals
    return total.toFixed(2);
  };

  // 2) “Continue Shopping” simply invokes the callback passed from parent
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // 3) Checkout (not required to be fully implemented yet)
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  // 4) Increment quantity: dispatch updateQuantity with quantity + 1
  const handleIncrement = (item) => {
    const newQty = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQty }));
  };

  // 5) Decrement quantity: if qty > 1, decrement; else remove the item entirely
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const newQty = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: newQty }));
    } else {
      // If quantity would go to 0, remove from cart
      dispatch(removeItem(item.name));
    }
  };

  // 6) Remove an item outright
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 7) Calculate subtotal for a single item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    const subtotal = unitPrice * item.quantity;
    return subtotal.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  –
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
