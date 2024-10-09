import QuestionLegend from "@/app/_components/QuestionLegend";
import {
  Checkbox,
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

interface SectionButtonProps {
  optional: boolean;
  isCheckboxSelected: boolean;
  isCheckboxDisabled: boolean;
  sectionName: string;
  active: boolean;
  questionLegend: number[];
  onClick: Function;
  onCheckboxSelect: Function;
}

function SectionButton(props: SectionButtonProps) {
  return (
    <Popover placement="bottom" trigger="hover" openDelay={400} isLazy>
      <PopoverContent>
        <PopoverBody>
          <strong>{props.sectionName}</strong>
          <QuestionLegend legendCounts={props.questionLegend} viewMode={0} />
        </PopoverBody>
      </PopoverContent>

      <PopoverAnchor>
        <div
          className={
            (props.active ? "bg-blue-900 text-white" : "bg-white") +
            ` flex items-center gap-1 px-1 rounded-md my-1 text-sm h-7 w-fit overflow-hidden max-w-52 cursor-pointer`
          }
        >
          {props.optional && (
            <Checkbox
              size={"md"}
              isChecked={props.isCheckboxSelected}
              onChange={() => props.onCheckboxSelect()}
              isDisabled={props.isCheckboxDisabled}
            />
          )}
          <Tooltip label={props.sectionName} openDelay={500}>
            <Text
              className="text-ellipsis line-clamp-1"
              onClick={() => {
                props.onClick();
              }}
            >
              {props.sectionName}
            </Text>
          </Tooltip>
          <PopoverTrigger>
            <span>
              <TbInfoCircleFilled className="text-sky-600 text-base cursor-pointer min-w-5" />
            </span>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
    </Popover>
  );
}

export default SectionButton;
