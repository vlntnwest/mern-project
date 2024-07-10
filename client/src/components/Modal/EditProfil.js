import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser, uploadPicture } from "../../actions/user.action";

const EditProfil = ({ toggleModal, userData }) => {
  const [name, setName] = useState(userData.name);
  const [bio, setBio] = useState(userData.bio);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      bio: bio,
    };

    dispatch(editUser(data, userData._id));

    if (file) {
      const pictureDataForm = new FormData();
      pictureDataForm.append("file", file);
      pictureDataForm.append("userId", userData._id);
      dispatch(uploadPicture(pictureDataForm, userData._id));
    }

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
              <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <img src={userData.picture} alt="profil" />
            </div>

            <input
              id="nameEdit"
              autoFocus={true}
              defaultValue={userData.name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              id="bioEdit"
              autoFocus={true}
              defaultValue={userData.bio}
              onChange={(e) => setBio(e.target.value)}
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
