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
  ButtonGroup,
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
  TbEdit,
  TbHourglass,
  TbLanguage,
  TbTransferOut,
  TbTrash,
} from "react-icons/tb";
import { db } from "@/db/db";
import useExport from "@/lib/useExport";
import useDelete from "@/lib/useDelete";

interface Props {
  testPaper: TestPaper;
  isOpen: boolean;
  onClose: () => void;
  inBuilt?: boolean;
}

const TestPaperInfoModal = ({ testPaper, isOpen, onClose, inBuilt }: Props) => {
  const availableAttempts = useLiveQuery(() =>
    db.testResponses.where("testId").equals(testPaper.id).toArray()
  )?.sort((a, b) => a.timestamps.testStartTime - b.timestamps.testStartTime);

  const router = useRouter();
  const { exportTestPaper } = useExport();
  const { deleteTestPaper } = useDelete();

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
                {testPaper.authors.length > 0 ? (
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
                ) : (
                  <Text>No authors listed</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {testPaper.analysis.preTestMessage !== undefined && (
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
              {testPaper.analysis.preTestMessage![languageIndex].length > 0 ? (
                <Text>{testPaper.analysis.preTestMessage![languageIndex]}</Text>
              ) : (
                <Text fontSize={"sm"} color={"gray.500"}>
                  No test description available
                </Text>
              )}
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
                      fontWeight={"medium"}
                      className="rounded-lg"
                      onClick={() => {
                        db.activeTestResponse.clear();
                        db.activeTestResponse.add(e);
                        router.push("/analysis");
                        onClose();
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

              if (inBuilt === true) {
                await db.testPapers.add(testPaper);
              }

              router.push("/test");
            }}
          >
            Attempt Paper
          </Button>
          <ButtonGroup ml={"auto"} variant={"outline"}>
            <Button
              colorScheme="yellow"
              leftIcon={<TbEdit />}
              onClick={async () => {
                await db.activeTestDraft.clear();
                await db.activeTestDraft.add(testPaper);
                router.push("/creator");
              }}
            >
              Edit
            </Button>
            <Button
              colorScheme="teal"
              leftIcon={<TbTransferOut />}
              onClick={() => exportTestPaper(testPaper)}
            >
              Export
            </Button>
            {!inBuilt && (
              <Button
                colorScheme="red"
                leftIcon={<TbTrash />}
                onClick={() => deleteTestPaper(testPaper.id)}
              >
                Delete
              </Button>
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TestPaperInfoModal;
