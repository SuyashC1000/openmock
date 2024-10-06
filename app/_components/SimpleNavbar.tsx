import { Badge, Heading } from "@chakra-ui/react";
import React from "react";

const SimpleNavbar = () => {
  return (
    <div className="bg-white h-10 flex-0 py-2 px-4 text-slate-800 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Heading size={"md"} cursor={"pointer"} fontWeight={"semibold"}>
          OpenMock
        </Heading>
        <Badge colorScheme="red" variant={"subtle"}>
          Alpha
        </Badge>
      </div>
    </div>
  );
};

export default SimpleNavbar;
