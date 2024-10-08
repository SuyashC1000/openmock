import { Text } from "@chakra-ui/react";
import React from "react";
import systemData from "../../public/systemData.json";

const Footer = () => {
  return (
    <div className="mt-auto">
      <Text textAlign={"center"} fontSize={"xs"}>
        © OpenMock {systemData.year}
      </Text>
    </div>
  );
};

export default Footer;
