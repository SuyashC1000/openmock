import QuestionLegend from "@/app/_components/QuestionLegend";
import {
  Checkbox,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TbInfoCircleFilled } from "react-icons/tb";

interface SectionButtonProps {
  optional: boolean;
  sectionName: string;
  active: boolean;
  questionLegend: number[];
  onClick: Function;
}

function SectionButton(props: SectionButtonProps) {
  return (
    <Popover placement="bottom" trigger="hover" openDelay={400}>
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
            ` flex items-center gap-0.5 p-1 rounded-md my-1 text-sm h-7 min-w-fit`
          }
          onClick={() => {
            props.onClick();
          }}
        >
          {props.optional && <Checkbox size={"sm"} />}
          <Text>{props.sectionName}</Text>
          <PopoverTrigger>
            <TbInfoCircleFilled className="text-sky-600 text-base" />
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
    </Popover>
  );
}

export default SectionButton;
