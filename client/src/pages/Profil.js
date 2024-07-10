import React, { useContext, useState } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import { useSelector } from "react-redux";
import EditProfil from "../components/Modal/EditProfil";
import Posts from "../components/posts/Posts";
import { isEmpty } from "../components/Utils";

const Profil = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const [editModal, setEditModal] = useState(false);
  const posts = useSelector((state) => state.postReducer);

  const sortedPosts = !isEmpty(posts)
    ? [...posts].sort((a, b) => b.date - a.date)
    : [];

  const savedTime = userData.createdAt;
  const formatedDate = new Date(savedTime).toLocaleString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const followersNumber = userData.followers ? userData.followers.length : 0;
  const followingNumber = userData.following ? userData.following.length : 0;

  const toggleModal = () => {
    setEditModal(!editModal);
  };

  return (
    <div className="profil-page">
      {uid ? (
        <div className="profil">
          <div className="img-container">
            <img src={userData.picture} alt="Profil" />
          </div>
          <h3>{userData.name ? userData.name : ""}</h3>
          <p>@{userData.username}</p>
          <p>{userData.bio ? userData.bio : null}</p>
          <p>Rejoins en {formatedDate}</p>
          <span>{followersNumber} Following</span>
          <span>{followingNumber} Followers</span>
          <button className="btn edit" onClick={toggleModal}>
            Edit profil
          </button>
          {editModal && (
            <EditProfil toggleModal={toggleModal} userData={userData} />
          )}
          {sortedPosts.map((post, index) => (
            <Posts post={post} key={index} />
          ))}
        </div>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
