// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/sunburst
import { MayHaveLabel } from "@nivo/pie";
import { ResponsiveSunburst } from "@nivo/sunburst";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveSunburst = ({
  data /* see data tab */,
}: {
  data: any;
}) => (
  <ResponsiveSunburst
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    id="name"
    value="loc"
    borderWidth={1}
    borderColor={{ theme: "background" }}
    colors={{ scheme: "category10" }}
    childColor={{
      from: "color",
      modifiers: [["brighter", 1]],
    }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ theme: "background" }}
  />
);
