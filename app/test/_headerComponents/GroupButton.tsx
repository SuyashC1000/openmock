import QuestionLegend from "@/app/_components/QuestionLegend";
import {
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import { TbInfoCircleFilled } from "react-icons/tb";

interface GroupButtonProps {
  optional: boolean;
  groupName: string;
  active: boolean;
  questionLegend: number[];
  onClick: Function;
  isDisabled: boolean;
}

function GroupButton(props: GroupButtonProps) {
  return (
    <Popover placement="bottom" trigger="hover" openDelay={400}>
      <PopoverContent>
        <PopoverBody>
          <strong>{props.groupName}</strong>
          <QuestionLegend legendCounts={props.questionLegend} viewMode={0} />
        </PopoverBody>
      </PopoverContent>

      <PopoverAnchor>
        <div
          className={
            (props.active ? "bg-blue-400 text-white" : "bg-white") +
            ` flex items-center gap-0.5 p-1 rounded-md my-1 text-sm h-7 min-w-fit ${props.isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`
          }
          onClick={() => props.onClick()}
        >
          {props.groupName}
          <PopoverTrigger>
            <TbInfoCircleFilled className="text-sky-700 text-base" />
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
    </Popover>
  );
}
export default GroupButton;
