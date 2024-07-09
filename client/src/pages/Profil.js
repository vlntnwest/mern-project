import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import { useSelector } from "react-redux";

const Profil = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  const savedTime = userData.createdAt;
  const formatedDate = new Date(savedTime).toLocaleString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const followersNumber = userData.followers.length;
  const followingNumber = userData.following.length;

  return (
    <div className="profil-page">
      {uid ? (
        <div className="profil">
          <div className="img-container">
            <img src="" alt="" />
          </div>
          <h3>{userData.name ? userData.name : ""}</h3>
          <p>@{userData.pseudo}</p>
          <p>Rejoins en {formatedDate}</p>
          <span>{followersNumber} Following</span>
          <span>{followingNumber} Followers</span>
          <div className="btn edit">Edit profil</div>
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
