import { Card, CardBody, Heading } from "@chakra-ui/react";
import React from "react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import { MyResponsivePie } from "../_components/charts/PieChart";
import { TestPaper, TestPaperTag } from "../_interface/testData";
import { getTagCountbyID, getTagDataByID } from "../_functions/getTagData";
import TestPage from "../test/page";

const pieChartDataGenerator = (testPaper: TestPaper, tags: string[]) => {
  return tags.map((tagID) => {
    const tag: TestPaperTag =
      tagID !== ""
        ? getTagDataByID(testPaper, tagID)
        : {
            color: "#e5e5e5",
            id: "",
            label: "Unassigned",
          };

    return {
      id: tag.label,
      label: tag.label,
      value: getTagCountbyID(testPaper, tag.id, tags),
      color: tag.color,
    };
  });
};

const TagStats = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  if (testPaper.analysis.customTagStats !== undefined) {
    return (
      <div>
        <Heading size={"lg"}>Tag Stats</Heading>
        <Card>
          <CardBody className="flex flex-col gap-4">
            {testPaper.analysis.customTagStats.map((e, i) => {
              return (
                <Card key={e.label}>
                  <CardBody>
                    <Heading size={"md"}>{e.label}</Heading>
                    <div style={{ width: 550, height: 250 }}>
                      <MyResponsivePie
                        data={pieChartDataGenerator(testPaper, e.tags)}
                        showArcLinkLabels={true}
                      />
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
