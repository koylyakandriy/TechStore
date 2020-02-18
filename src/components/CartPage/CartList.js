import React, { useContext } from "react";

import CartItem from "./CartItem";
import { ProductContext } from "../../context/context";

const CartList = () => {
  const values = useContext(ProductContext);
  const { cart, increment, decrement, removeItem } = values;

  return (
    <div className="container-fluid">
      {cart.length === 0 ? (
        <h1 className="text-title text-center my-4">
          Your cart is currently empty
        </h1>
      ) : (
        <div className="row">
          <div className="col">
            {cart.map(item => (
              <CartItem
                key={item.id}
                cartItem={item}
                increment={increment}
                decrement={decrement}
                removeItem={removeItem}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
