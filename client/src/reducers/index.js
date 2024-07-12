import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import profileReducer from "./profile.reducer";

export default combineReducers({
  userReducer,
  postReducer,
  profileReducer,
});
