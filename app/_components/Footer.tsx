import { Link, Text } from "@chakra-ui/react";
import React from "react";
import systemData from "../../public/systemData.json";

const Footer = () => {
  return (
    <div className="mt-auto">
      <Text textAlign={"center"} fontSize={"sm"}>
        © OpenMock {systemData.year}
      </Text>
      <Text textAlign={"center"} fontSize={"xs"}>
        <Link href="/home">Home</Link> &bull;{" "}
        <Link href="/legal/terms-of-service">ToS</Link> &bull;{" "}
        <Link href="/legal/privacy">Privacy</Link>
      </Text>
    </div>
  );
};

export default Footer;
