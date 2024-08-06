// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { Text } from "@chakra-ui/react";
import { MayHaveLabel, ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsivePie = ({
  data,
  isHalf = false,
  defaultScheme = false,
  showLegend = false,
}: {
  data: MayHaveLabel[];
  isHalf?: boolean;
  defaultScheme?: boolean;
  showLegend?: boolean;
}) => (
  <ResponsivePie
    data={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    startAngle={-90}
    endAngle={isHalf ? 90 : undefined}
    innerRadius={0.55}
    activeOuterRadiusOffset={8}
    borderWidth={4}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    enableArcLinkLabels={false}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLabel={(e) => `${e.value}`}
    arcLinkLabelsColor={{ from: "color" }}
    enableArcLabels={false}
    arcLabelsTextColor={{ theme: "background" }}
    colors={defaultScheme ? { scheme: "pastel1" } : { datum: "data.color" }}
    legends={
      showLegend === true
        ? [
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]
        : undefined
    }
  />
);
