import { db } from "@/db/db";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  GridItem,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import TestPaperCard from "./TestPaperCard";
import { useLiveQuery } from "dexie-react-hooks";
import testData from "../../../public/data/testData.json";
import {
  TbFileDownload,
  TbFilePlus,
  TbFolderDown,
  TbFolderPlus,
  TbPlus,
  TbSettings,
} from "react-icons/tb";
import { useRouter } from "next/navigation";
import TestDraftCard from "./TestDraftCard";

const MainView = () => {
  const availableTests =
    useLiveQuery(() =>
      db.testPapers.orderBy("timeCreated").reverse().toArray()
    ) ?? [];

  const availableDrafts = useLiveQuery(() => db.testDrafts.toArray()) ?? [];

  const router = useRouter();

  return (
    <div>
      <Flex>
        <Heading>Home</Heading>
        <Menu>
          <MenuButton
            as={Button}
            ml={"auto"}
            colorScheme="red"
            leftIcon={<TbPlus />}
          >
            Add
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<TbFilePlus size={20} />}
              onClick={async () => {
                await db.activeTestDraft.clear();
                router.push("/creator");
              }}
            >
              Create Test
            </MenuItem>
            <MenuItem icon={<TbFileDownload size={20} />}>Import Test</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <br />

      <Heading size={"lg"} fontWeight={"semibold"}>
        Test Papers
      </Heading>

      <SimpleGrid
        gap={2}
        templateColumns={"repeat(auto-fill, minmax(30rem, 1fr))"}
      >
        {availableTests.map((e, i) => (
          <GridItem key={e.id}>
            <TestPaperCard testPaper={e} />
          </GridItem>
        ))}
      </SimpleGrid>

      <br />

      <Button
        onClick={async () => {
          await db.testPapers.add(testData);
        }}
      >
        Add Test
      </Button>
      <br />
      <Heading size={"lg"} fontWeight={"semibold"}>
        Test Drafts
      </Heading>
      <SimpleGrid
        gap={2}
        templateColumns={"repeat(auto-fill, minmax(30rem, 1fr))"}
      >
        {availableDrafts.map((e, i) => (
          <GridItem key={e.id}>
            <TestDraftCard testDraft={e} />
          </GridItem>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default MainView;
