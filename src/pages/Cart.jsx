import CartItem from "../components/CartItem";
import { useContext } from "react";
import Checkout from "../components/Checkout";
import { Link } from "react-router-dom";
import CartContext from "../Context/Cart/CartContext";

const Cart = () => {
  const { cartItems, checkout, clearCart } = useContext(CartContext);

  console.warn(cartItems);

  return (
    <>
      <div className="container my-5">
        <h2>
          Shopping Cart
          <span>({cartItems?.length})</span>
        </h2>

        {checkout && (
          <div>
            <h4>Thank you for your purchase!</h4>
            <p>
              Your order has been placed and will be delivered to you within 24
              hours.
            </p>
            <Link to="/">
              <button onClick={clearCart} className="btn btn-primary">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="row">
          <div className="col-md-8">
            {
              <div>
                {cartItems.length === 0 ? (
                  <h4 className="mt-4">Cart is empty</h4>
                ) : (
                  <ul className="">
                    {cartItems.map((product) => (
                      <div className="card my-4 p-2">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item ">
                            <CartItem key={product.id} product={product} />
                          </li>
                        </ul>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            }
          </div>

          <div className="col-md-4">
            {/* Checkout component  */}
            {cartItems.length > 0 && <Checkout />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
