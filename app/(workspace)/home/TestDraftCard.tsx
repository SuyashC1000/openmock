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
import { useRouter } from "next/navigation";

interface Props {
  testDraft: TestPaper;
}

const TestDraftCard = ({ testDraft }: Props) => {
  const router = useRouter();

  return (
    <div>
      <Card
        onClick={async () => {
          await db.activeTestDraft.clear();
          await db.activeTestDraft.add(testDraft);
          router.push("/creator");
        }}
        cursor={"pointer"}
        size={"sm"}
      >
        <CardBody>
          <Flex
            w={"full"}
            flexDirection={"column"}
            gap={1}
            justifyContent={"space-between"}
          >
            <Text
              size={"md"}
              fontWeight={"medium"}
              flex={1}
              textOverflow={"ellipsis"}
              maxW={"full"}
              whiteSpace={"pre-line"}
            >
              {testDraft.name}
            </Text>
            <Flex ml={"auto"} gap={2} flex={0} flexDirection={"row"}>
              <Tag colorScheme="blackAlpha" variant={"outline"}>
                <TagLeftIcon as={TbDiamonds} />
                {testDraft.maxMetrics.marks}
              </Tag>
              <Tag colorScheme="blackAlpha" variant={"outline"}>
                <TagLeftIcon as={TbClipboard} />
                {testDraft.maxMetrics.questions}Qs
              </Tag>
              <Tag colorScheme="blackAlpha" variant={"outline"}>
                <TagLeftIcon as={TbHourglass} />
                {testDraft.maxMetrics.time}m
              </Tag>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </div>
  );
};

export default TestDraftCard;
