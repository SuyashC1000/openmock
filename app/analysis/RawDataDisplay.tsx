import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";

const RawDataDisplay = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  return (
    <div>
      <Card>
        <CardBody>
          <Heading size={"md"}>Response</Heading>
          <Text>{JSON.stringify(testResponse)}</Text>
        </CardBody>
        <br />
      </Card>
      <Card>
        <CardBody>
          <Heading size={"md"}>Paper</Heading>
          <Text>{JSON.stringify(testPaper)}</Text>
        </CardBody>
        <br />
      </Card>
    </div>
  );
};

export default RawDataDisplay;
