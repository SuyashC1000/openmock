import {
  Box,
  Card,
  CardBody,
  Circle,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import { MyResponsivePie } from "../../_components/charts/PieChart";
import { TestPaper, TestPaperTag } from "../../_interface/testData";
import {
  getTagDataByID,
  getTaggedQuestionDataByID,
} from "../../_functions/getTagData";
import TestPage from "../../(test)/test/page";
import Marks from "../../_components/Marks";

const TagStats = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  const [taggedQuestionData, setTaggedQuestionData] = React.useState(
    getTaggedQuestionDataByID(testPaper, testResponse)
  );

  const pieChartDataGenerator = (
    tagCategoryData: {
      id: string;
      count: number;
      timeSpent: number;
      marks: number;
      label: string;
      color: string;
    }[]
  ) => {
    return tagCategoryData.map((tagData) => {
      return {
        id: tagData.label,
        label: tagData.label,
        value: tagData.count,
        color: tagData.color,
      };
    });
  };

  if (testPaper.analysis.customTagStats !== undefined) {
    return (
      <div>
        <Heading size={"lg"}>Tag Stats</Heading>
        <Card>
          <CardBody className="flex flex-col gap-4">
            {taggedQuestionData.map((e, i) => {
              return (
                <Card key={e.title}>
                  <CardBody>
                    <Heading size={"md"}>{e.title}</Heading>
                    <div className="flex items-start">
                      <div style={{ width: 350, height: 250 }}>
                        <MyResponsivePie data={pieChartDataGenerator(e.data)} />
                      </div>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Color</Th>
                            <Th className="w-4/12">Label</Th>
                            <Th>Questions</Th>
                            <Th>Marks</Th>
                            <Th>Time Spent</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {e.data.map((f, j) => {
                            return (
                              <Tr key={j}>
                                <Td>
                                  <Box
                                    h={5}
                                    w={5}
                                    bgColor={f.color}
                                    rounded={"full"}
                                  />
                                </Td>
                                <Td>{f.label}</Td>
                                <Td>{f.count}</Td>
                                <Td>{Marks([f.marks, 1], "element")}</Td>
                                <Td>{f.timeSpent}s</Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </CardBody>
        </Card>
      </div>
    );
  } else return null;
};

export default TagStats;
