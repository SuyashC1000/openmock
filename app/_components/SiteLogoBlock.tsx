import { Badge, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

const SiteLogoBlock = () => {
  const router = useRouter();
  return (
    <>
      <Heading
        size={"md"}
        cursor={"pointer"}
        fontWeight={"semibold"}
        onClick={() => router.push("/home")}
      >
        OpenMock
      </Heading>
      <Badge ml={2} colorScheme="red" variant={"subtle"}>
        Alpha
      </Badge>
    </>
  );
};

export default SiteLogoBlock;
