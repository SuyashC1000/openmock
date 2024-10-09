import { Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { TestStateContext } from "../page";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";

interface Props {
  limit?: boolean;
  align?: "left" | "center" | "right";
}

const DisplayedUserName = ({ limit, align }: Props) => {
  const userData = useLiveQuery(async () => {
    return await db.userData.toArray();
  });
  const username =
    userData !== undefined && userData.length > 0
      ? userData[0].profile.name
      : "";

  const finalLimit = limit ?? 1;
  return (
    <Text
      className="font-semibold"
      textAlign={align ?? "center"}
      noOfLines={finalLimit ? 1 : undefined}
    >
      {username !== "" ? (
        username
      ) : (
        <span className="italic font-normal">User</span>
      )}
    </Text>
  );
};

export default React.memo(DisplayedUserName);
