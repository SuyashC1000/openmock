import { Card, CardBody, Heading } from "@chakra-ui/react";
import React from "react";

const QuestionEditor = () => {
  return (
    <Card flex={1}>
      <CardBody>
        <Heading size={"md"} fontWeight={"medium"}>
          Question Editor
        </Heading>
      </CardBody>
    </Card>
  );
};

export default QuestionEditor;
