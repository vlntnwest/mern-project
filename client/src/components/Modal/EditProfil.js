import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../actions/user.action";

const EditProfil = ({ toggleModal, userData }) => {
  const [editName, setEditName] = useState(userData.name);
  const [editBio, setEditBio] = useState(userData.bio);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    const userEditData = {
      name: editName,
      bio: editBio,
    };

    dispatch(editUser(userEditData, userData._id));
    toggleModal(false);
  };

  return (
    <div>
      <div className="edit-modal">
        <div className="overlay"></div>
        <div className="content">
          <h2>Edit profil</h2>
          <form onSubmit={(e) => handleEdit(e)}>
            <div className="img-container">
              <img src="" alt="" />
            </div>
            <input
              id="nameEdit"
              autoFocus={true}
              defaultValue={userData.name}
              onChange={(e) => setEditName(e.target.value)}
            />
            <textarea
              id="bioEdit"
              autoFocus={true}
              defaultValue={userData.bio}
              onChange={(e) => setEditBio(e.target.value)}
            ></textarea>
            <button className="btn-save">Save</button>
          </form>

          <button className="close-modal" onClick={toggleModal}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfil;
