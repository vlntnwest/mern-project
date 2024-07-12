import axios from "axios";

export const GET_USER = "GET_USER";
export const EDIT_USER = "EDIT_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const GET_PROFILE = "GET_PROFILE";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const FOLLOWED_USER = "FOLLOWED_USER";
export const UNFOLLOWED_USER = "UNFOLLOWED_USER";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const editUser = (data, uid) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${uid}`, data)
      .then((res) => {
        dispatch({ type: EDIT_USER, payload: data });
      });
  };
};

export const uploadPicture = (data, uid) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          });
      })
      .catch((err) => console.log(err));
  };
};

export const fetchUserIfNeeded = (username) => (dispatch, getState) => {
  const { userReducer } = getState();

  if (!userReducer || userReducer.username !== username) {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/username/${username}`)
      .then((res) => {
        dispatch({ type: "SET_USER_DATA", payload: res.data });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
};

export const getProfile = (username) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/username/${username}`)
      .then((res) => {
        dispatch({ type: GET_PROFILE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const follow = (idToFollow, userId) => {
  return (dispatch) => {
    console.log("Follow request:", { idToFollow });
    return axios
      .patch(`${process.env.REACT_APP_API_URL}api/user/follow/${userId}`, {
        idToFollow,
      })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { userId, idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

export const unfollow = (idToUnfollow, userId) => {
  return (dispatch) => {
    console.log("Unfollow request:", { idToUnfollow });
    return axios
      .patch(`${process.env.REACT_APP_API_URL}api/user/unfollow/${userId}`, {
        idToUnfollow,
      })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { userId, idToUnfollow } });
      })
      .catch((err) => console.log(err));
  };
};
