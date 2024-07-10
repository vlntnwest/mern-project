import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { deletePost, editPost } from "../../actions/post.action";

const ProfilPosts = ({ post }) => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const savedTime = post.createdAt;
  const formatedDate = new Date(savedTime).toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="post">
      <p>{user.pseudo}</p>
      <p>{post.message}</p>
      <p>{formatedDate}</p>
    </div>
  );
};

export default ProfilPosts;
