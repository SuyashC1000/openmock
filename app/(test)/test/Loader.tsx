import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Icon,
  Link,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import {
  TbMoodConfuzed,
  TbMoodConfuzedFilled,
  TbMoodEmpty,
  TbMoodEmptyFilled,
  TbMoodSadDizzy,
} from "react-icons/tb";

interface Props {
  status: "loading" | "success" | "failure" | "empty";
}

const Loader = (props: Props) => {
  return (
    <>
      {props.status !== "success" && (
        <div className="z-50 fixed top-0 left-0 h-screen w-screen bg-white flex justify-center items-center">
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
              bgColor={"red.100"}
            >
              <CardBody className="flex flex-col items-center gap-2">
                <Icon as={TbMoodSadDizzy} boxSize={"90px"} color={"red.400"} />
                <Heading size={"lg"}>Fatal Error Encountered</Heading>
                <Text>The system could not proceed with the test.</Text>
                <Text>
                  This could be due to error(s) in the test paper. Please
                  contact the owner(s) of the test paper to resolve the issue.
                </Text>

                <br />
                <Accordion allowToggle width={"full"}>
                  <AccordionItem>
                    <AccordionButton className="flex justify-center">
                      <Heading size={"xs"}>
                        Technical tips for owner(s):
                      </Heading>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <UnorderedList textAlign={"left"}>
                        <ListItem>
                          <Text>
                            Check the browser console for more information on
                            the error(s).
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text>
                            Make sure you haven&apos;t tampered with the JSON
                            file.
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text>
                            Try importing the JSON file into the Test Creator
                            Page to locate source of the error.{" "}
                          </Text>
                        </ListItem>
                      </UnorderedList>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <br />
                <Link href="/home">
                  <Button colorScheme="blue">Return to Home</Button>
                </Link>
              </CardBody>
            </Card>
          )}
          {props.status === "empty" && (
            <Card
              size={"lg"}
              maxW={"2xl"}
              textAlign={"center"}
              bgColor={"gray.100"}
            >
              <CardBody className="flex flex-col items-center gap-2">
                <Icon as={TbMoodConfuzed} boxSize={"90px"} color={"gray.400"} />
                <Heading size={"lg"}>
                  You shouldn&apos;t be here... yet.
                </Heading>
                <Text>
                  You seem to have landed on this page without selecting any
                  particular test.
                </Text>
                <Text>
                  You must first select one from the dashboard in the Home page.
                  You will be automatically redirected here with the chosen test
                  visible on the screen.
                </Text>
                <br />
                <Link href="/home">
                  <Button colorScheme="blue">Return to Home</Button>
                </Link>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </>
  );
};

export default Loader;
