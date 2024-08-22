// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine, Serie } from "@nivo/line";
import { MayHaveLabel } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveLine = ({
  data /* see data tab */,
  axisBottom,
  axisLeft,
}: {
  data: Serie[];
  axisBottom?: any;
  axisLeft?: any;
}) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    curve="cardinal"
    axisTop={null}
    axisRight={null}
    axisBottom={axisBottom}
    axisLeft={axisLeft}
    // axisBottom={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   legend: "transportation",
    //   legendOffset: 36,
    //   legendPosition: "middle",
    //   truncateTickAt: 0,
    // }}
    // axisLeft={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   legend: "count",
    //   legendOffset: -40,
    //   legendPosition: "middle",
    //   truncateTickAt: 0,
    // }}
    lineWidth={3}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel="data.yFormatted"
    pointLabelYOffset={-12}
    areaOpacity={0.05}
    enableSlices="x"
    enableTouchCrosshair={true}
    useMesh={true}
    legends={[]}
  />
);
