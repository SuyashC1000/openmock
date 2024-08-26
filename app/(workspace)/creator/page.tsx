"use client";

import React from "react";
import Navbar from "../../_components/Navbar";
import MainView from "./MainView";
import { Text } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";

const CreatorPage = () => {
  const sample = useLiveQuery(() => db.activeTestResponse.toArray());

  console.log(sample);

  return (
    <div>
      <Text>Hello</Text>
    </div>
  );
};

export default CreatorPage;
