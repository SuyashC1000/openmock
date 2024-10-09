import { db } from "@/db/db";
import { Avatar } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";

interface Props {
  size?: "sm" | "md" | "lg" | "xl";
}

const DisplayedUserProfilePic = ({ size }: Props) => {
  const userData = useLiveQuery(async () => {
    return await db.userData.toArray();
  });
  const username =
    userData !== undefined && userData.length > 0
      ? userData[0].profile.name
      : "";
  const profileImgSrc =
    userData !== undefined && userData.length > 0
      ? userData[0].profile.imageSrc
      : "";

  return (
    <Avatar
      size={size ?? "lg"}
      name={username}
      src={profileImgSrc}
      className="flex-0 self-center"
    />
  );
};

export default DisplayedUserProfilePic;
