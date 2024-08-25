import React from "react";
import { TestPaper } from "../_interface/testData";
import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/navigation";
import * as d3 from "d3";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Heading,
  Icon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import AuthorLinkButton from "./AuthorLinkButton";
import {
  TbClipboard,
  TbClock,
  TbDeviceDesktop,
  TbDiamonds,
  TbHourglass,
  TbLanguage,
} from "react-icons/tb";
import { db } from "@/db/db";

interface Props {
  testPaper: TestPaper;
  isOpen: boolean;
  onClose: () => void;
}

const TestPaperInfoModal = ({ testPaper, isOpen, onClose }: Props) => {
  const availableAttempts = useLiveQuery(() =>
    db.testResponses.where("testId").equals(testPaper.id).toArray()
  )?.sort((a, b) => a.timestamps.testStartTime - b.timestamps.testStartTime);

  const router = useRouter();
  const testPaperDate = new Date(testPaper.timeCreated);
  const [languageIndex, setLanguageIndex] = React.useState(0);

  const formatTime = d3.utcFormat("%I:%M:%S %p • %d/%m/%G");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"5xl"}
      scrollBehavior="inside"
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pt={8}>
          <Heading size={"lg"}>{testPaper.name}</Heading>

          <UnorderedList listStyleType={"none"}>
            <ListItem>
              <Text>
                <Icon as={TbDiamonds} /> Max Marks:{" "}
                <strong>{testPaper.maxMetrics.marks}</strong>
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Icon as={TbClipboard} /> Max Questions:{" "}
                <strong>{testPaper.maxMetrics.questions}</strong>
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <Icon as={TbHourglass} /> Test Duration:{" "}
                <strong>{testPaper.maxMetrics.time} min</strong>
              </Text>
            </ListItem>
          </UnorderedList>

          <Accordion allowToggle size={"sm"}>
            <AccordionItem>
              <AccordionButton>
                <Text mr={3}>More</Text> <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <UnorderedList>
                  <ListItem>
                    <Text>
                      Supported languages: {testPaper.languages.join(", ")}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      Created at: {formatTime(new Date(testPaperDate))}
                    </Text>
                  </ListItem>
                </UnorderedList>
                <br />
                <Heading size={"sm"} mb={2}>
                  Authors:
                </Heading>
                <UnorderedList spacing={2}>
                  {testPaper.authors.map((e, i) => (
                    <ListItem key={i} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={e.name}
                          src={e.avatarUrl !== null ? e.avatarUrl : undefined}
                          size={"sm"}
                        />
                        <Text fontSize={"lg"}>{e.name}</Text>
                      </div>
                      <div className="*:m-1">
                        {e.links.map((f, j) => {
                          return <AuthorLinkButton key={j} {...f} />;
                        })}
                      </div>
                    </ListItem>
                  ))}
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {testPaper.analysis.preTestMessage !== null && (
            <>
              <br />
              <div className="flex items-center justify-between">
                <Heading size={"md"}>Test Description</Heading>
                <select
                  onChange={(e) => {
                    setLanguageIndex(+e.target.value);
                  }}
                >
                  {testPaper.languages.map((e, i) => {
                    return (
                      <option value={i} key={i}>
                        {e}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Text>{testPaper.analysis.preTestMessage![languageIndex]}</Text>
            </>
          )}
          <br />

          {availableAttempts?.length !== 0 && (
            <>
              <br />
              <Heading size={"sm"}>Previous Attempts</Heading>
              <Flex gap={1} flexDirection={"column"}>
                {availableAttempts?.map((e, i) => {
                  const attemptDate = new Date(e.timestamps.testStartTime);

                  return (
                    <Button
                      key={i}
                      px={3}
                      w={"full"}
                      variant={"ghost"}
                      fontWeight={"semibold"}
                      className="rounded-lg"
                      onClick={async () => {
                        await db.activeTestResponse.clear();
                        await db.activeTestResponse.add(e);
                        router.push("/analysis");
                      }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w={"full"}
                      >
                        <div className="flex gap-3">
                          <Text>#{i + 1}</Text>
                          <Text>{formatTime(attemptDate)}</Text>
                        </div>

                        <Text fontSize={"sm"}>
                          <Icon as={TbDiamonds} />
                          {e.scoreData.marks.total}/{e.scoreData.marks.max}{" "}
                          &bull; <Icon as={TbClock} />
                          {Math.floor(
                            (e.timestamps.testEndTime -
                              e.timestamps.testStartTime) /
                              1000
                          )}
                          s
                        </Text>
                      </Flex>
                    </Button>
                  );
                })}
              </Flex>
            </>
          )}
        </ModalBody>
        <ModalFooter justifyContent={"start"}>
          <Button
            leftIcon={<TbDeviceDesktop />}
            colorScheme="red"
            onClick={async () => {
              await db.activeTestPaper.clear();
              await db.activeTestPaper.add(testPaper);
              router.push("/test");
            }}
          >
            Attempt Paper
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TestPaperInfoModal;
