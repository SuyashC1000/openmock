import {
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Tag,
  TagLeftIcon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { TestPaper } from "../../_interface/testData";
import {
  TbCheck,
  TbClipboard,
  TbDiamonds,
  TbHourglass,
  TbPencil,
} from "react-icons/tb";
import TestPaperInfoModal from "../../_components/TestPaperInfoModal";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";

const TestCard = ({ testPaper }: { testPaper: TestPaper }) => {
  const attemptCount = useLiveQuery(() =>
    db.testResponses.where("testId").equals(testPaper.id).count()
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Card onClick={onOpen} cursor={"pointer"} size={"sm"} maxWidth={"30rem"}>
        <CardBody>
          <Flex
            w={"full"}
            alignItems={"start"}
            flexDirection={"column"}
            gap={1}
            justifyContent={"space-between"}
          >
            <Text size={"md"} fontWeight={"medium"} flex={1}>
              {testPaper.name}
            </Text>
            <Flex gap={2} flex={0} flexDirection={"row"}>
              {attemptCount != 0 && (
                <Tag w={"fit"} colorScheme="yellow" variant={"solid"}>
                  <TagLeftIcon as={TbCheck} />
                  {attemptCount}
                </Tag>
              )}
              <Tag colorScheme="red" variant={"outline"}>
                <TagLeftIcon as={TbDiamonds} />
                {testPaper.maxMetrics.marks}
              </Tag>
              <Tag colorScheme="green" variant={"outline"}>
                <TagLeftIcon as={TbClipboard} />
                {testPaper.maxMetrics.questions}Qs
              </Tag>
              <Tag colorScheme="cyan" variant={"outline"}>
                <TagLeftIcon as={TbHourglass} />
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
