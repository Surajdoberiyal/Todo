import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Tables from "../components/Tables";

const TablePage = () => {
  const [userList, setUserList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [filterdUsers, setFilterdUsers] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortByID, setSortByID] = useState("");

  useEffect(() => {
    setLoading(true);
    //   Fetch users
    fetch(`https://dummyjson.com/users`)
      .then((res) => res.json())
      .then((data) => {
        setUserList(data?.users);
        setLoading(false);
      });
    //   Fetch posts
    fetch(`https://dummyjson.com/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPostList(data?.posts);
        setLoading(false);
      });
  }, []);

  // Search Users
  useEffect(() => {
    setLoading(true);
    const searchUsersList = async () => {
      try {
        fetch(`https://dummyjson.com/users/search?q=${searchUser}`)
          .then((res) => res.json())
          .then((data) => {
            setFilterdUsers(data?.users);
            setLoading(false);
          });
      } catch (e) {
        console.warn(e);
      }
    };

    const searchUsersApiCall = setTimeout(() => {
      searchUsersList();
    }, 500);

    return () => clearTimeout(searchUsersApiCall);
  }, [searchUser]);

  //    Sort by ID
  useEffect(() => {
    setLoading(true);
    if (sortByID === "asscending") {
      let sortAsIdA_Z = [...userList];
      sortAsIdA_Z.sort((a, b) => a?.id - b?.id);
      setFilterdUsers(sortAsIdA_Z);
      setLoading(false);
    } else if (sortByID === "descending") {
      let sortAsIdZ_A = [...userList];
      sortAsIdZ_A.sort((a, b) => b?.id - a?.id);
      setFilterdUsers(sortAsIdZ_A);
      setLoading(false);
    }
  }, [sortByID]);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <div className="text-center">
          <h2 className="text-center mb-5">User List</h2>
        </div>
        <div className="d-flex">
          <div className="">
            <div className="input-group">
              <input
                type="text"
                className="form-control w-300"
                placeholder={"Search by name..."}
                value={searchUser}
                onChange={(e) => setSearchUser(e?.target?.value)}
              />
              <button
                type="button"
                className="btn bg-transparent"
                onClick={() => {
                  setSearchUser("");
                  setFilterdUsers([]);
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
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5 pb-5">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : (
        <Tables
          userList={filterdUsers?.length !== 0 ? filterdUsers : userList}
          setSortByID={setSortByID}
          postList={postList}
        />
      )}
    </div>
  );
};

export default TablePage;
