import React from "react";
import { useSelector } from "react-redux";

const Posts = ({ post, user }) => {
  const userData = useSelector((state) => state.userReducer);

  const savedTime = post.createdAt;
  const formatedDate = new Date(savedTime).toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="post">
      <p>{userData ? userData.username : user.username}</p>
      <p>{post.message}</p>
      <p>{formatedDate}</p>
    </div>
  );
};

export default Posts;
