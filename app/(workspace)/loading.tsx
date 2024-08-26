"use client";

import { Spinner, Text } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center gap-2 my-auto">
      <Spinner size={"xl"} color="black.100" thickness="5px" />
      <Text>Loading...</Text>
    </div>
  );
};

export default Loading;
