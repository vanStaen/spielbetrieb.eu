import React from "react";

export const NotificationTitle = (props) => {
  const { type, linkToUserPage } = props;

  switch (type) {
    case 1:
      return <>{linkToUserPage} sent you a friend request!</>;
    case 2:
      return <>{linkToUserPage} started following you!</>;
    case 3:
      return <>You got mail from ${linkToUserPage}!</>;
    case 11:
      return <>{linkToUserPage} accepted your friend request!</>;
    case 12:
      return <>{linkToUserPage} refused your friend request!</>;
    case 61:
      return <>{linkToUserPage} added a new profile picture</>;
    default:
      console.log("Notification Type unknown!");
  }
};
