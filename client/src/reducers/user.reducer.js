import {
  EDIT_USER,
  GET_USER,
  UPLOAD_PICTURE,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../actions/user.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case EDIT_USER:
      return {
        ...state,
        ...action.payload,
      };
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: [...state.following, action.payload.idToFollow],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}
