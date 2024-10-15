import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import { calculateScoreData } from "../../_functions/calculateScoreData";

const RawDataDisplay = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  return (
    <div>
      <Card>
        <CardBody>
          <Heading size={"md"}>Summary</Heading>
          <Text>
            {JSON.stringify(calculateScoreData(testPaper, testResponse))}
          </Text>
        </CardBody>
      </Card>
    </div>
  );
};

export default RawDataDisplay;
