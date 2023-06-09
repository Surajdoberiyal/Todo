import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import CartContext from "../Context/Cart/CartContext";

const ProductCard = ({ allProducts }) => {
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <div className="container">
      <div className="row">
        {allProducts?.map((product) => (
          <div className="col-md-4 mb-4">
            <div className="product-card card" style={{ width: "25rem" }}>
              <Link
                to={`/product/${product?.id}`}
                className="navLink text-dark"
              >
                <img
                  className="card-img-top"
                  src={product?.thumbnail}
                  alt="Card image cap"
                  style={{ height: "10rem" }}
                />
              </Link>
              <div className="product-card-body card-body">
                <Link
                  to={`/product/${product?.id}`}
                  className="navLink text-dark"
                >
                  <h4 className="product-card-title card-title">
                    {product?.title}
                  </h4>
                  <h5>{"$ " + product?.price}</h5>
                  <p className="card-text text-truncate-2">
                    {product?.description}
                  </p>
                  <h6>
                    Ratings :{" "}
                    <apan className="badge bg-light text-dark">
                      {product?.rating}
                    </apan>
                  </h6>
                </Link>
                <div>
                  {isInCart(product) && (
                    <button
                      onClick={() => {
                        removeFromCart(product);
                      }}
                      className="btn btn-danger mt-3 mb-2"
                    >
                      Remove
                    </button>
                  )}

                  {!isInCart(product) && (
                    <button
                      className="btn btn-primary mt-3 mb-2"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
