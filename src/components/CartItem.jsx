import { useContext } from "react";
import CartContext from "../Context/Cart/CartContext";

const CartItem = ({ product }) => {
  const { removeFromCart } = useContext(CartContext);

  console.warn(product);
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <img
            src={product?.thumbnail}
            alt={product.title}
            width={300}
            height={150}
            className="rounded-lg"
          />
        </div>

        <div className="col-md-8">
          <div className="mx-5 ps-5">
            <h4 className="mb-3">{product?.title}</h4>
            <p className="mb-3">{product?.description}</p>
            <h5 className="my-4">
              Price :{" "}
              <span className="badge bg-dark text-white">{product?.price}</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
