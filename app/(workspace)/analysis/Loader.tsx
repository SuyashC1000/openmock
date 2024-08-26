import { Card, CardBody, Heading, Icon, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { TbMoodConfuzed, TbMoodSadDizzy } from "react-icons/tb";

const Loader = (props: {
  status: "loading" | "success" | "failure" | "empty";
}) => {
  return (
    <>
      {props.status !== "success" && (
        <div className="bg-white h-full w-full flex items-center justify-center">
          {props.status === "loading" && (
            <div className="flex flex-col items-center gap-2">
              <Spinner size={"xl"} color="black.100" thickness="5px" />
              <Text>Loading...</Text>
            </div>
          )}
          {props.status === "failure" && (
            <Card
              size={"lg"}
              maxW={"2xl"}
              textAlign={"center"}
              variant={"outline"}
              borderWidth={3}
            >
              <CardBody className="flex flex-col items-center gap-2">
                <Icon as={TbMoodSadDizzy} boxSize={"90px"} color={"red.400"} />
                <Heading size={"lg"}>Fatal Error Encountered</Heading>
                <Text>Test Attempt Analysis could not be shown.</Text>
                <Text>
                  This could happen due to error in test response data or
                  missing test paper. Try going back to the dashboard and
                  reselecting the same test attempt.
                </Text>
              </CardBody>
            </Card>
          )}
          {props.status === "empty" && (
            <Card
              size={"lg"}
              maxW={"2xl"}
              textAlign={"center"}
              variant={"outline"}
              borderWidth={3}
            >
              <CardBody className="flex flex-col items-center gap-2">
                <Icon as={TbMoodConfuzed} boxSize={"90px"} color={"gray.400"} />
                <Heading size={"lg"}>
                  You shouldn&apos;t be here... yet.
                </Heading>
                <Text>
                  You don&apos;t seem to have selected any particular test
                  attempt for analysis.
                </Text>
                <Text>
                  You must first select one from the dashboard. You will be
                  automatically redirected here with the chosen test attempt
                  visible on the screen.
                </Text>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </>
  );
};

export default Loader;
