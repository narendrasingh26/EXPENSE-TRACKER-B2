import React, { useContext, useRef } from 'react';
import AuthContext from '../store/auth-context';
import './Updateprofile.css'

const UpdateProfile = () => {
  const authCtx = useContext(AuthContext);
  const nameInputRef = useRef();
  const photoUrlInputRef = useRef();

  const updateProfileHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;

    authCtx.updateUserProfile(enteredName, enteredPhotoUrl);

    // Optionally, you can reset the form fields
    nameInputRef.current.value = '';
    photoUrlInputRef.current.value = '';
  };

  return (
    <div className="update-profile-container"> {/* Apply the container class */}
      <form className="update-profile-form" onSubmit={updateProfileHandler}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor="photoUrl">Profile URL:</label>
          <input type="text" id="photoUrl" ref={photoUrlInputRef} />
        </div>
        <button className="update-profile-button" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
