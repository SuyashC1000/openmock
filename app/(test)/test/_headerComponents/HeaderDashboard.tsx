import React from "react";
import GroupSelect from "./GroupSelect";
import SectionSelect from "./SectionSelect";
import {
  Avatar,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Text,
} from "@chakra-ui/react";
import Timer from "../Timer";
import {
  TestDispatchContext,
  TestStateContext,
  TestPaperContext,
} from "../page";
import { SET_DEFAULT_LANGUAGE } from "@/app/_functions/userCacheReducer";
import useActiveElements from "@/lib/useActiveElements";
import DisplayedUserName from "../_misc/DisplayedUserName";
import DisplayedUserProfilePic from "../_misc/DisplayedUserProfilePic";

const OptionalSectionNotice = () => {
  const state = React.useContext(TestStateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(TestDispatchContext);

  const { activeGroup } = useActiveElements();

  const totalOptionalSections = activeGroup.sections.reduce(
    (p, c) => (c.optional ? (p = p + 1) : p),
    0
  );
  const allowedOptionalSections =
    activeGroup.constraints?.maxOptionalSectionsAnswered;

  return (
    <Text>
      Sections
      <span className="text-xs font-medium">
        {allowedOptionalSections !== undefined &&
          ` (Attempt any ${allowedOptionalSections} of the ${totalOptionalSections} optional sections by clicking on the checkbox of the sections.)`}
      </span>
    </Text>
  );
};

const DashboardPopover = () => {
  const state = React.useContext(TestStateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(TestDispatchContext);

  return (
    <Popover
      placement="left-start"
      offset={[0, 10]}
      trigger="hover"
      closeDelay={800}
      arrowPadding={1}
      arrowSize={15}
    >
      <PopoverAnchor>
        <PopoverTrigger>
          <div
            className="w-64 bg-white flex-0 flex flex-box flex-col items-center justify-start
            gap-3 p-2 outline outline-1 outline-neutral-400"
          >
            <DisplayedUserProfilePic />
            <DisplayedUserName />
          </div>
        </PopoverTrigger>
      </PopoverAnchor>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text>Your name: </Text>
          <DisplayedUserName align="left" limit={false} />

          <Text mt={1}>Select language:</Text>
          <Select
            value={state.currentLanguageIndex}
            onChange={(e) => {
              dispatch({
                type: SET_DEFAULT_LANGUAGE,
                payload: e.target.value,
              });
            }}
          >
            {testPaper.languages.map((e, i) => {
              return (
                <option value={i} key={i}>
                  {e}
                </option>
              );
            })}
          </Select>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const HeaderDashboard = () => {
  return (
    <div className="h-auto flex">
      <div className=" flex-1 flex flex-box flex-col">
        <GroupSelect />
        <div className="bg-white h-8 flex justify-between items-center p-1 text-sm">
          <OptionalSectionNotice />
          <Timer />
        </div>
        <SectionSelect />
      </div>
      <DashboardPopover />
    </div>
  );
};
export default HeaderDashboard;
