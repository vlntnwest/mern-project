import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../actions/user.action";

const FollowButton = ({ targetUserId }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (userData.following) {
      setIsFollowing(userData.following.includes(targetUserId));
    }
  }, [userData, targetUserId]);

  const handleFollow = () => {
    console.log("Following:", targetUserId, "with userId:", userData._id);
    dispatch(follow(targetUserId, userData._id));
  };

  const handleUnfollow = () => {
    console.log("Unfollowing:", targetUserId, "with userId:", userData._id);
    dispatch(unfollow(targetUserId, userData._id));
  };

  return (
    <div className="btn-container">
      {isFollowing ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </div>
  );
};

export default FollowButton;
