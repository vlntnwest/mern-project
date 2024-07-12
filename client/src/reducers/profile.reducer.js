import {
  GET_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../actions/user.action";

const initialState = {};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload;
    case FOLLOW_USER:
      return {
        ...state,
        followers: [...state.followers, action.payload.userId],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        followers: state.followers.filter((id) => id !== action.payload.userId),
      };
    default:
      return state;
  }
}
