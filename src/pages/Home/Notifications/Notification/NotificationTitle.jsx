import React from "react";

export const NotificationTitle = (props) => {
  const { type, linkToUserPage } = props;
  switch (type) {
    case 1:
      return (
        <div className="notification__title">
          {linkToUserPage} sent you a friend request!
        </div>
      );
    case 2:
      return (
        <div className="notification__title">
          {linkToUserPage} started following you!
        </div>
      );
    case 3:
      return (
        <div className="notification__title">
          You got mail from ${linkToUserPage}!
        </div>
      );
    case 11:
      return (
        <div className="notification__title">
          {linkToUserPage} accepted your friend request!
        </div>
      );
    case 12:
      return (
        <div className="notification__title">
          {linkToUserPage} refused your friend request!
        </div>
      );
    case 61:
      return (
        <div className="notification__title">
          {linkToUserPage} added a new profile picture
        </div>
      );
    default:
      console.log("Notification Type unknown!");
  }
};
