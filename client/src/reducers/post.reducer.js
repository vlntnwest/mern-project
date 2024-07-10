import { DELETE_POST, EDIT_POST, GET_USER_POSTS } from "../actions/post.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_POSTS:
      return action.payload;
    case EDIT_POST:
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.id != action.payload);
    default:
      return state;
  }
}
