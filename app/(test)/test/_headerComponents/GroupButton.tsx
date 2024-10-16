import QuestionLegend from "@/app/_components/QuestionLegend";
import {
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
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
    <Popover placement="bottom" trigger="hover" openDelay={400} isLazy>
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
            ` flex items-center gap-0.5 p-1 rounded-md my-1 text-sm h-7 w-fit overflow-hidden max-w-52
             ${props.isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`
          }
          onClick={() => props.onClick()}
        >
          <Tooltip label={props.groupName} openDelay={500}>
            <Text className="text-ellipsis line-clamp-1">
              {props.groupName}
            </Text>
          </Tooltip>
          <PopoverTrigger>
            <span>
              <TbInfoCircleFilled className="text-sky-700 text-base cursor-pointer min-w-5" />
            </span>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
    </Popover>
  );
}
export default GroupButton;
