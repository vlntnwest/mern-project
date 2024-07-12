import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditProfil from "../components/Modal/EditProfil";
import Posts from "../components/posts/Posts";
import { isEmpty } from "../components/Utils";
import { getUserPosts } from "../actions/post.action";
import { getProfile } from "../actions/user.action";
import FollowButton from "./Button/FollowButton";

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer);
  const profileData = useSelector((state) => state.profileReducer);
  const posts = useSelector((state) => state.postReducer);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (username !== userData.username) {
          await dispatch(getProfile(username));
        }
        dispatch(getUserPosts(profileData._id || userData._id));
      } catch (error) {
        setError(
          error.response
            ? error.response.data.error
            : "Error fetching user data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, userData.username, dispatch, profileData._id, userData._id]);

  const sortedPosts = !isEmpty(posts)
    ? [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const [editModal, setEditModal] = useState(false);
  const toggleModal = () => {
    setEditModal(!editModal);
  };

  const renderUserProfile = () => {
    const user = username === userData.username ? userData : profileData;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return user ? (
      <div className="profil">
        <div className="img-container">
          <img src={user.picture} alt="Profil" />
        </div>
        <h3>{user.name ? user.name : ""}</h3>
        <p>@{user.username}</p>
        <p>{user.bio ? user.bio : null}</p>
        <p>Rejoins en {new Date(user.createdAt).toLocaleDateString("fr-FR")}</p>
        <span>{user.following?.length || 0} Following</span>
        <span>{user.followers?.length || 0} Followers</span>
        {username === userData.username && (
          <button className="btn edit" onClick={toggleModal}>
            Edit profil
          </button>
        )}
        {editModal && (
          <EditProfil toggleModal={toggleModal} userData={userData} />
        )}
        {username !== userData.username && (
          <FollowButton targetUserId={user._id} />
        )}
        {sortedPosts.map((post, index) => (
          <Posts post={post} key={index} />
        ))}
      </div>
    ) : null;
  };

  return <div className="profil-page">{renderUserProfile()}</div>;
};

export default UserProfile;
