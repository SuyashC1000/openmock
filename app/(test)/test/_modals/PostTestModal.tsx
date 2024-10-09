import React from "react";
import {
  TestDispatchContext,
  TestStateContext,
  TestPaperContext,
} from "../page";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Heading,
  Icon,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import {
  TbAbc,
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandYoutube,
  TbChevronLeft,
  TbChevronRight,
  TbExternalLink,
  TbInfoHexagon,
  TbMail,
  TbPhone,
  TbRosetteDiscountCheckFilled,
} from "react-icons/tb";
import SummaryTable from "../_misc/SummaryTable";
import { getNumOfQuestionStatuses } from "@/app/_functions/getFunctions";
import { AuthorLinkType, TestPaperAuthor } from "@/app/_interface/testData";
import { db } from "@/db/db";
import AuthorLinkButton from "@/app/_components/AuthorLinkButton";

const PostTestModal = () => {
  const state = React.useContext(TestStateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(TestDispatchContext);

  const [showFinishModal, setShowFinishModal] = React.useState(true);
  const [pageIndex, setPageIndex] = React.useState(1);

  const PageHandler = () => {
    if (pageIndex === 1) {
      return (
        <div className="p-4 flex flex-col gap-2 overflow-y-auto">
          <Heading size={"lg"}>Post Exam Summary</Heading>
          <br />
          <Heading size={"md"}>Total</Heading>

          <Table className="table-fixed border-2 border-neutral-500">
            <Thead className="border-b-2 border-neutral-500 bg-blue-300">
              <Tr>
                <Th>No. of Questions</Th>
                <Th>Attempted</Th>
                <Th>Answered</Th>
                <Th>Not Answered</Th>
                <Th>Marked for Review</Th>
                <Th>Answered & Marked for Review (will also be evaluated)</Th>
                <Th>Not Visited</Th>
              </Tr>
            </Thead>
            <Tbody className="font-bold">
              <Tr>
                <Td>
                  {getNumOfQuestionStatuses("paper", [0, 1, 2, 3, 4], state)}
                </Td>
                <Td>{getNumOfQuestionStatuses("paper", [2, 4], state)}</Td>
                <Td>{getNumOfQuestionStatuses("paper", [2], state)}</Td>
                <Td>{getNumOfQuestionStatuses("paper", [1], state)}</Td>
                <Td>{getNumOfQuestionStatuses("paper", [3], state)}</Td>
                <Td>{getNumOfQuestionStatuses("paper", [4], state)}</Td>
                <Td>{getNumOfQuestionStatuses("paper", [0], state)}</Td>
              </Tr>
            </Tbody>
          </Table>
          <SummaryTable />
        </div>
      );
    } else if (pageIndex === 2) {
      return (
        <>
          <div className="p-4 flex flex-col gap-2 overflow-y-auto h-full relative">
            <Heading size={"lg"}>Authors</Heading>
            <br />
            <UnorderedList spacing={4}>
              {testPaper.authors.map((e, i) => {
                return (
                  <ListItem key={e.name} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Avatar
                        name={e.name}
                        src={e.avatarUrl !== null ? e.avatarUrl : undefined}
                        size={"md"}
                      />
                      <Text fontSize={"xl"}>{e.name}</Text>
                    </div>
                    <div className="*:m-1">
                      {e.links.map((f, j) => {
                        return <AuthorLinkButton key={j} {...f} />;
                      })}
                    </div>
                  </ListItem>
                );
              })}
            </UnorderedList>
            <div className="absolute bottom-0 right-0 p-4 text-right">
              <Text>Made with</Text>
              <Link href="./">
                <Text className="font-medium text-lg">OpenMock Project</Text>
              </Link>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen bg-white z-10 "
      hidden={state.testStatus !== "finished"}
    >
      <Modal
        isOpen={state.testStatus === "finished" && showFinishModal}
        onClose={() => {}}
        closeOnEsc
        closeOnOverlayClick
        isCentered
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent bgColor={"green.50"}>
          <ModalHeader className="flex flex-col items-center -mb-2 mt-3">
            <Icon
              as={TbRosetteDiscountCheckFilled}
              boxSize={"100px"}
              color={"green.700"}
            />
            <Heading size={"lg"}>Test Complete</Heading>
          </ModalHeader>

          <ModalBody>
            <Text>
              The test is now over. All of your responses have been successfully
              recorded.
            </Text>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              colorScheme="green"
              mr={3}
              onClick={async () => {
                setShowFinishModal(false);
                await document.exitFullscreen().catch(() => {});
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="flex-1 flex flex-col h-screen max-h-screen flex-box">
        <div className="flex flex-1 flex-col overflow-y-auto">
          <PageHandler />
        </div>
        <div className="h-16 outline outline-1 outline-neutral flex items-center justify-between px-3 flex-0">
          <Button
            leftIcon={<TbChevronLeft />}
            variant={"outline"}
            visibility={pageIndex === 2 ? "visible" : "hidden"}
            onClick={() => setPageIndex(1)}
          >
            Summary
          </Button>

          <ButtonGroup>
            <Link href="./home">
              <Button colorScheme="blue">Go to Home</Button>
            </Link>
            <Link href="./analysis">
              <Button colorScheme="purple">View Analysis</Button>
            </Link>
          </ButtonGroup>
          <Button
            rightIcon={<TbChevronRight />}
            variant={"outline"}
            visibility={pageIndex === 1 ? "visible" : "hidden"}
            onClick={() => setPageIndex(2)}
          >
            Credits
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostTestModal;
