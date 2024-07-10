import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import EditProfil from "../components/Modal/EditProfil";
import Posts from "../components/posts/Posts";
import { isEmpty } from "../components/Utils";
import { getUserPosts } from "../actions/post.action";

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  // Utilisation de Redux pour les utilisateurs connectés
  const userData = useSelector((state) => state.userReducer);
  const posts = useSelector((state) => state.postReducer);

  // Utilisation de useState pour les utilisateurs non connectés
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour charger les données d'utilisateur et de post depuis l'API via Axios
    const fetchData = async () => {
      setLoading(true);
      try {
        let userResponse;
        if (username === userData.username) {
          // Utilisateur connecté, pas besoin de charger l'utilisateur via Axios
          userResponse = userData;
        } else {
          // Utilisateur non connecté, charger depuis Axios
          userResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}api/user/username/${username}`
          );
          setUser(userResponse.data);
        }

        dispatch(getUserPosts(userResponse.data._id));
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

    fetchData(); // Appeler fetchData pour charger les données au montage ou lorsque username change
  }, [username, userData.username, dispatch]);

  // Tri des posts
  const sortedPosts = !isEmpty(posts)
    ? [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  // Fonction pour basculer le modal d'édition de profil
  const [editModal, setEditModal] = useState(false);
  const toggleModal = () => {
    setEditModal(!editModal);
  };

  // Fonction pour afficher les informations du profil
  const renderUserProfile = () => {
    // Utilisateur connecté, afficher depuis Redux
    if (username === userData.username) {
      return (
        <div className="profil">
          <div className="img-container">
            <img src={userData.picture} alt="Profil" />
          </div>
          <h3>{userData.name ? userData.name : ""}</h3>
          <p>@{userData.username}</p>
          <p>{userData.bio ? userData.bio : null}</p>
          <p>
            Rejoins en{" "}
            {new Date(userData.createdAt).toLocaleDateString("fr-FR")}
          </p>
          <span>{userData.following.length} Following</span>
          <span>{userData.followers.length} Followers</span>
          <button className="btn edit" onClick={toggleModal}>
            Edit profil
          </button>
          {editModal && (
            <EditProfil toggleModal={toggleModal} userData={userData} />
          )}
          {sortedPosts.map((post, index) => (
            <Posts post={post} user={user} key={index} />
          ))}
        </div>
      );
    }

    // Utilisateur non connecté, afficher depuis Axios
    if (loading) {
      return <p>Loading...</p>; // Afficher un indicateur de chargement si les données sont en cours de chargement
    }

    if (error) {
      return <p>Error: {error}</p>; // Afficher un message d'erreur si une erreur se produit lors du chargement des données
    }

    if (user) {
      return (
        <div className="profil">
          <div className="img-container">
            <img src={user.picture} alt="Profil" />
          </div>
          <h3>{user.name ? user.name : ""}</h3>
          <p>@{user.username}</p>
          <p>{user.bio ? user.bio : null}</p>
          <p>
            Rejoins en {new Date(user.createdAt).toLocaleDateString("fr-FR")}
          </p>
          <span>{user.following.length} Following</span>
          <span>{user.followers.length} Followers</span>
          {sortedPosts.map((post, index) => (
            <Posts post={post} key={index} />
          ))}
        </div>
      );
    }

    return null; // Retourne null si aucune donnée n'est disponible pour l'utilisateur non connecté
  };

  return <div className="profil-page">{renderUserProfile()}</div>;
};

export default UserProfile;
