import React from "react";
import { Link } from "react-router-dom";

export const Card = ({ projectNumber, projectTitle }) => (
  <div className="card " style={{ width: "40rem" }}>
    <div className="row">
      <div className="col-md-5">
        <img
          style={{ width: "100%", height: "100%" }}
          src="https://cdn.pixabay.com/photo/2017/08/12/09/17/industry-2633878__340.jpg"
        />
      </div>
      <div className="col-md-7">
        <div className="card-body text-start">
          <h3 className="display-5 d-block">
            <strong>{projectNumber} </strong>
          </h3>
          <h4 className="text-grey pt-3 ">{projectTitle}</h4>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="bg_light  ">
      <div className="container">
        <div
          className="homwe_wrapper d-flex align-items-center justify-content-center text-center flex-column"
          style={{ height: "90vh" }}
        >
          <Link to="/todo" className="navLink text-dark my-4">
            <Card projectNumber={"Project-1 :"} projectTitle={"Todo List"} />
          </Link>
          <Link to="/table" className="navLink text-dark my-4">
            <Card
              projectNumber={"Project-2 :"}
              projectTitle={"Displaying Data From an API"}
            />
          </Link>
          <Link to="/e-commerce" className="navLink text-dark my-4">
            <Card
              projectNumber={"Project-3 :"}
              projectTitle={"E-commerce website with cart managements"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
