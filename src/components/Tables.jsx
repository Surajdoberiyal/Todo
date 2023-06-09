import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Tables = ({ userList, setSortByID, postList }) => {
  const navigate = useNavigate();

  const userListnewArr = userList?.map((user) => {
    const postListWithId = postList.reduce((obj, value) => {
      obj[value.userId] = value;
      return obj;
    }, {});
    const postObj = postListWithId[user?.id];

    return {
      ...user,
      postTitle: postObj?.title,
      postBody: postObj?.body,
    };
  });

  return (
    <table className="table mt-5 table-hover">
      <thead className="bg-light">
        <tr>
          <th scope="col">
            <div className="d-flex">
              #Id
              <div className="d-flex flex-column ms-3">
                <i
                  className="bx bxs-up-arrow mb-1 "
                  onClick={() => setSortByID("asscending")}
                  style={{ fontSize: "8px", cursor: "pointer" }}
                />
                <i
                  className="bx bxs-down-arrow mt-1"
                  onClick={() => setSortByID("descending")}
                  style={{ fontSize: "8px", cursor: "pointer" }}
                />
              </div>
            </div>
          </th>
          <th scope="col">Image</th>
          <th scope="col">User Name</th>
          <th scope="col">Full Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Email</th>
          <th scope="col">Post Title/ Post Body</th>
        </tr>
      </thead>
      <tbody>
        {userListnewArr?.map((user) => (
          <tr
            onClick={() => navigate(`/user/${user?.id}`)}
            className="cursor-pointer"
          >
            <th scope="row">{user?.id}</th>
            <td>
              <img src={user?.image} width={50} height={50} />
            </td>
            <td>{user?.username}</td>
            <td>
              {user?.firstName} {user?.lastName}
            </td>
            <td>{user?.gender}</td>
            <td>{user?.email}</td>
            <td>
              <strong>{user?.postTitle}</strong>
              <br />
              {user?.postBody ? user?.postBody : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tables;
