import React from "react";
import Footer from "../../_components/Footer";
import { Heading, Text } from "@chakra-ui/react";
import { DraftStateContext } from "./page";

const MainView = () => {
  const state = React.useContext(DraftStateContext);
  return (
    <div>
      <Heading>Creator page</Heading>
      <Text>{JSON.stringify(state)}</Text>
    </div>
  );
};

export default MainView;
