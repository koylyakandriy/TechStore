import React, { useContext } from "react";

import { ProductContext } from "../../context/context";

const CartTotals = () => {
  const values = useContext(ProductContext);
  const { clearCart, cartSubTotal, cartTax, cartTotal } = values;

  return (
    <div className="container">
      <div className="row">
        <div className="col text-title text-center my-4">
          <button
            className="btn btn-outline-danger text-capitalize mb-4"
            onClick={clearCart}
          >
            clear cart
          </button>
          <h3>subtotal: ${cartSubTotal}</h3>
          <h3>tax: ${cartTax}</h3>
          <h3>total: ${cartTotal}</h3>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
