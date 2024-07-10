import { EDIT_USER, GET_USER, UPLOAD_PICTURE } from "../actions/user.action";

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
    default:
      return state;
  }
}
