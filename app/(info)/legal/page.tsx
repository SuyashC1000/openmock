import { Heading, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";

const LegalPage = () => {
  return (
    <div>
      <title>Legal - OpenMock</title>

      <Heading size={"md"}>Legal</Heading>
      <Text>
        This is the legal section of the site. Choose to visit the following
        pages from here:
      </Text>
      <br />
      <UnorderedList>
        <ListItem>
          <Link href="/legal/terms-of-service">
            <Text>Terms of Service</Text>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/legal/privacy">
            <Text>Privacy Policy</Text>
          </Link>
        </ListItem>
      </UnorderedList>
      <br />
      <Text>This page is currently under development</Text>
    </div>
  );
};

export default LegalPage;
