import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { userId } = useParams();

  const [user, setUser] = useState([]);
  const [postList, setPostList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //   Fetch users
    fetch(`https://dummyjson.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
    //   Fetch posts
    fetch(`https://dummyjson.com/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPostList(data?.posts);
      });
    //   Fetch comments
    fetch(`https://dummyjson.com/comments`)
      .then((res) => res.json())
      .then((data) => {
        setCommentsList(data?.comments);
      });
  }, []);

  //    create post obj with userID
  const postListWithId = postList.reduce((obj, value) => {
    obj[value?.userId] = value;
    return obj;
  }, {});

  //    create comments obj with userID
  const commentsListWithId = commentsList.reduce((obj, value) => {
    obj[value?.user?.id] = value;
    return obj;
  }, {});

  const postObj = postListWithId[user?.id];
  const commentsObj = commentsListWithId[user?.id];

  const userDetails = {
    ...user,
    postTitle: postObj?.title,
    postBody: postObj?.body,
    postComments: commentsObj?.body,
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={userDetails?.image}
            alt={userDetails?.firstName}
            style={{ width: "100%", height: "90%" }}
          />
        </div>
        <div className="col-md-6">
          <div
            className="d-flex justify-content-center flex-column"
            style={{ width: "100%", height: "90%" }}
          >
            <h1 className="my-5">User Details</h1>
            <table className="table user_details">
              <tbody>
                <tr>
                  <th>#ID</th>
                  <td>{userDetails?.id}</td>
                </tr>
                <tr>
                  <th>User Name</th>
                  <td>{userDetails?.username}</td>
                </tr>
                <tr>
                  <th>Full Name</th>
                  <td>
                    {userDetails?.firstName} {userDetails?.lastName}
                  </td>
                </tr>
                <tr>
                  <th>Age</th>
                  <td>{userDetails?.age}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{userDetails?.gender}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{userDetails?.email}</td>
                </tr>
                <tr>
                  <th>Post Title</th>
                  <td>{userDetails?.postTitle}</td>
                </tr>
                <tr>
                  <th>Post Body</th>
                  <td>{userDetails?.postBody}</td>
                </tr>
                <tr>
                  <th>Post Comments</th>
                  <td>
                    {userDetails?.postComments
                      ? userDetails?.postComments
                      : "No comments.."}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
