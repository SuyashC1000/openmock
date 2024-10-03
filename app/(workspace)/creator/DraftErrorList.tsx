import { TestPaper } from "@/app/_interface/testData";
import { Card, CardBody, Text } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

const DraftErrorList = () => {
  const {
    formState: { errors },
    watch,
  } = useFormContext<TestPaper>();

  const temp = watch("body");

  return (
    <Card colorScheme="red" bgColor={"red.200"}>
      <CardBody>
        {/* {Object.values(errors).map((e, i) => (
          <Text key={i}>{e?.message}</Text>
        ))} */}
        <Text>{JSON.stringify(errors.body?.root?.message)}</Text>
      </CardBody>
    </Card>
  );
};

export default DraftErrorList;
