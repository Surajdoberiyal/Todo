import { useContext } from "react";
import CartContext from "../Context/Cart/CartContext";

const Checkout = () => {
  const { clearCart, handleCheckout, itemCount, total } =
    useContext(CartContext);

  return (
    <div>
      <div className="card my-4 p-2">
        <ul className="list-group list-group-flush">
          <li className="list-group-item ">
            <div className="d-flex">
              <h4>Total Items:</h4>
              <h4 className="mx-4">{itemCount}</h4>
            </div>
            <hr />
            <div className="d-flex">
              <h4>Total Payment:</h4>
              <h4 className="mx-4">{total}</h4>
            </div>
            <hr />
            <div className="mt-5 mb-3">
              <button className="btn btn-primary mx-3" onClick={handleCheckout}>
                CHECKOUT
              </button>
              <button className="btn btn-dark mx-3" onClick={clearCart}>
                CLEAR
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Checkout;
