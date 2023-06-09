import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../Context/Cart/CartContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
  return (
    <div className="container">
      {!product ? (
        <div className="text-center my-5 pb-5">
          <div className="spinner-border text-info" role="status"></div>
        </div>
      ) : (
        <div className=" mt-5 mb-5" style={{ height: "80vh" }}>
          <div className=" d-flex justify-content-center">
            <div className="row ">
              <div className="col-md-6">
                <div className="images p-3 card">
                  <div className="text-center p-4 ">
                    <img id="main-image" src={product?.thumbnail} width="400" />
                  </div>
                  <div className="thumbnail text-center">
                    {product?.images?.map((value) => (
                      <img
                        className="mx-2 border rounded"
                        src={value}
                        width="100"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className=" d-flex align-items-start flex-column justify-content-center p-4 h-100">
                  <div className="mt-4 mb-3">
                    <h4>
                      <span className="text-uppercase text-muted brand">
                        {product?.category}
                      </span>
                    </h4>
                    <h1 className="text-uppercase">{product?.title}</h1>
                    <div className="price d-flex flex-row align-items-center mt-3">
                      <h4 className="act-price mb-0">
                        MRP : ${product?.price}
                      </h4>
                      <div className="ms-4">
                        <h5 className="mb-0">
                          ({product?.discountPercentage}% OFF)
                        </h5>
                      </div>
                    </div>
                  </div>
                  <p className="about fs-5">{product?.description}</p>

                  <div className="cart mt-4 align-items-center">
                    {isInCart(product) && (
                      <button
                        onClick={() => {
                          removeFromCart(product);
                        }}
                        className="btn btn-danger  text-uppercase px-5"
                      >
                        Remove
                      </button>
                    )}

                    {!isInCart(product) && (
                      <button
                        className="btn btn-primary  text-uppercase px-5  "
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
