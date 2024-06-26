import React from "react";
import GroupSelect from "./GroupSelect";
import SectionSelect from "./SectionSelect";
import { Avatar, Text } from "@chakra-ui/react";
import Timer from "../Timer";
import { StateContext, TestPaperContext } from "../page";
import { getActiveGroup } from "@/app/_formatters/getActiveCache";

function HeaderDashboard() {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);

  const activeGroup = getActiveGroup(testPaper, state);

  const totalOptionalSections = activeGroup.sections.reduce(
    (p, c) => (c.optional ? (p = p + 1) : p),
    0
  );
  const allowedOptionalSections =
    activeGroup.constraints?.maxOptionalSectionsAnswered;

  return (
    <div className="h-auto flex">
      <div className=" flex-1 flex flex-box flex-col">
        <GroupSelect />
        <div className="bg-white h-8 flex justify-between items-center p-1 text-sm">
          <Text>
            Sections
            <span className="text-xs font-medium">
              {allowedOptionalSections !== undefined &&
                ` (Attempt any ${allowedOptionalSections} of the ${totalOptionalSections} optional sections by clicking on the checkbox of the sections.)`}
            </span>
          </Text>

          <Timer />
        </div>
        <SectionSelect />
      </div>
      <div
        className="w-64 bg-white flex-0 flex flex-box flex-col items-center justify-start
      gap-3 p-2 outline outline-1 outline-neutral-400"
      >
        <Avatar size={"lg"} className="flex-0 self-center" />
        <Text className="font-semibold flex-1 text-center">User</Text>
      </div>
    </div>
  );
}
export default HeaderDashboard;
