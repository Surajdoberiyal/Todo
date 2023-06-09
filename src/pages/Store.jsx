import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";

const Store = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filterdProducts, setFilterdProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [filteredByCategories, setFilteredByCategories] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");

  //  Fetch products and categories
  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data?.products);
        setLoading(false);
      });

    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setProductCategories(data);
        setLoading(false);
      });
  }, []);

  // Search products
  useEffect(() => {
    setLoading(true);
    const searchProducts = async () => {
      try {
        fetch(`https://dummyjson.com/products/search?q=${searchProduct}`)
          .then((res) => res.json())
          .then((data) => {
            setFilterdProducts(data?.products);
            setLoading(false);
          });
      } catch (e) {
        console.warn(e);
      }
    };

    const searchProductApiCall = setTimeout(() => {
      searchProducts();
    }, 500);

    return () => clearTimeout(searchProductApiCall);
  }, [searchProduct]);

  // Filter Categories
  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${filteredByCategories}`)
      .then((res) => res.json())
      .then((data) => {
        setFilterdProducts(data?.products);
        setLoading(false);
      });
  }, [filteredByCategories]);

  return (
    <>
      <div className="bg_light  ">
        <div className="container">
          <div className="homwe_wrapper d-flex align-items-center justify-content-center text-center">
            <div>
              <h1 className="display-2 font-weight-bold">
                <strong>Welcome to E-commerce</strong>
              </h1>
              <h4 className="text-grey px-5 pt-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="product_list my-5 container">
        <div className="d-flex justify-content-between">
          <div className="text-center">
            <h2 className="text-center mb-5">Our products</h2>
          </div>
          <div className="d-flex">
            <div className="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e?.target?.value)}
                />
                <button
                  type="button"
                  className="btn bg-transparent"
                  onClick={() => {
                    setSearchProduct("");
                    setFilterdProducts("");
                  }}
                  style={{
                    left: "-40px",
                    zIndex: "999",
                  }}
                >
                  <i className="bx bx-x" />
                </button>
              </div>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Filter by categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {productCategories?.map((category) => (
                  <Dropdown.Item
                    onClick={() => setFilteredByCategories(category)}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {loading ? (
          <div className="text-center my-5 pb-5">
            <div className="spinner-border text-info" role="status"></div>
          </div>
        ) : filterdProducts ? (
          <ProductCard allProducts={filterdProducts} />
        ) : (
          <ProductCard allProducts={allProducts} />
        )}
      </div>
    </>
  );
};

export default Store;
