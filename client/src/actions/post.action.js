import axios from "axios";

export const GET_USER_POSTS = "GET_USER_POSTS";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

export const getUserPosts = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER_POSTS, payload: res.data });
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  };
};
export const editPost = (data, uid) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/post/${uid}`, data)
      .then((res) => {
        dispatch({ type: EDIT_POST, payload: data });
      });
  };
};

export const deletePost = (postId, uid) => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}api/post/${uid}`)
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: postId });
      });
  };
};
