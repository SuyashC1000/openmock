import {
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Tag,
  TagLeftIcon,
  useDisclosure,
} from "@chakra-ui/react";
import { TestPaper } from "../_interface/testData";
import {
  TbCheck,
  TbClipboard,
  TbDiamonds,
  TbHourglass,
  TbPencil,
} from "react-icons/tb";
import TestPaperInfoModal from "../_components/TestPaperInfoModal";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";

const TestCard = ({ testPaper }: { testPaper: TestPaper }) => {
  const attemptCount = useLiveQuery(() =>
    db.testResponses.where("testId").equals(testPaper.id).count()
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Card onClick={onOpen} cursor={"pointer"} size={"sm"}>
        <CardBody>
          <Flex
            w={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Heading size={"md"} fontWeight={"medium"} flex={1}>
              {testPaper.name}
            </Heading>
            <Flex gap={2} flex={0} flexDirection={"row"}>
              {attemptCount != 0 && (
                <Tag
                  size={"lg"}
                  w={"fit"}
                  colorScheme="yellow"
                  variant={"solid"}
                >
                  <TagLeftIcon as={TbCheck} fontSize={"xl"} />
                  {attemptCount}
                </Tag>
              )}
              <Tag size={"lg"} colorScheme="red" variant={"outline"}>
                <TagLeftIcon as={TbDiamonds} fontSize={"xl"} />
                {testPaper.maxMetrics.marks}
              </Tag>
              <Tag size={"lg"} colorScheme="green" variant={"outline"}>
                <TagLeftIcon as={TbClipboard} fontSize={"xl"} />
                {testPaper.maxMetrics.questions}Qs
              </Tag>
              <Tag size={"lg"} colorScheme="cyan" variant={"outline"}>
                <TagLeftIcon as={TbHourglass} fontSize={"xl"} />
                {testPaper.maxMetrics.time}m
              </Tag>
            </Flex>
          </Flex>
          <TestPaperInfoModal
            testPaper={testPaper}
            isOpen={isOpen}
            onClose={onClose}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default TestCard;
