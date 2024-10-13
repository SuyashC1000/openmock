import TestPaperInfoModal from "@/app/_components/TestPaperInfoModal";
import { TestPaper } from "@/app/_interface/testData";
import { db } from "@/db/db";
import useDelete from "@/lib/useDelete";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import { TbInfoCircle, TbTrash } from "react-icons/tb";

const TestPaperInstance = ({ paper }: { paper: TestPaper }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { deleteTestPaper } = useDelete();

  return (
    <Card key={paper.id} variant={"outline"} size={"sm"}>
      <CardBody py={2}>
        <Flex alignItems={"center"}>
          <Text>{paper.name}</Text>
          <ButtonGroup ml={"auto"} size={"sm"} variant={"ghost"}>
            <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
              <TbInfoCircle size={20} />
            </Button>
            <Button colorScheme="red" onClick={() => deleteTestPaper(paper.id)}>
              <TbTrash size={20} />
            </Button>
          </ButtonGroup>
        </Flex>
        <TestPaperInfoModal
          testPaper={paper}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </CardBody>
    </Card>
  );
};

const UserSavedTests = () => {
  const testPapers =
    useLiveQuery(() =>
      db.testPapers.orderBy("timeCreated").reverse().toArray()
    ) ?? [];

  return (
    <Card>
      <CardBody>
        <Heading size={"md"}>Saved Test Papers</Heading>
        <br />

        {testPapers.length > 0 ? (
          <Flex flexDirection={"column"} gap={2}>
            {testPapers.map((paper) => (
              <TestPaperInstance paper={paper} key={paper.id} />
            ))}
          </Flex>
        ) : (
          <Text color={"gray.500"}>You will see all your saved tests here</Text>
        )}
      </CardBody>
    </Card>
  );
};

export default UserSavedTests;
