import React, { useEffect, useState } from "react";
import Routes from "./components/Routes/";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.action";
import { getUserPosts } from "./actions/post.action";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}jwtid`, {
          withCredentials: true,
        });
        setUid(res.data);
      } catch (err) {
        console.log("No token");
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (uid) {
      dispatch(getUser(uid));
      dispatch(getUserPosts(uid));
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};
export default App;
