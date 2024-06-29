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
import { DispatchContext, StateContext, TestPaperContext } from "../page";
import { SET_DEFAULT_LANGUAGE } from "@/app/_formatters/userCacheReducer";
import useActiveElements from "@/lib/useActiveElements";

function HeaderDashboard() {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);

  const { activeGroup } = useActiveElements();

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
              <Avatar size={"lg"} className="flex-0 self-center" />
              <Text className="font-semibold flex-1 text-center">
                {state.userDetails.name}
              </Text>
            </div>
          </PopoverTrigger>
        </PopoverAnchor>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Text>
              Your name: <strong>{state.userDetails.name}</strong>
            </Text>
            <br />
            <Text>Select language:</Text>
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
    </div>
  );
}
export default HeaderDashboard;
