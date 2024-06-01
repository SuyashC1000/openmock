import { Text } from "@chakra-ui/react";
import React from "react";
import { TbInfoCircleFilled, TbList } from "react-icons/tb";

interface Props {
  type: number;
}

const TestHeader = () => {
  function PaperOptionsGroup() {
    return (
      <div className="flex text-white gap-2">
        <PaperOptions type={0} />
        <PaperOptions type={1} />
      </div>
    );
  }

  function PaperOptions(props: Props) {
    return (
      <div className="flex items-center gap-1 cursor-pointer hover:bg-neutral-600 p-1 rounded select-none font-medium">
        <PaperOptionsCOntent />
      </div>
    );

    function PaperOptionsCOntent() {
      switch (props.type) {
        case 0:
          return (
            <>
              <TbInfoCircleFilled className="text-sky-700 text-base" />
              <Text className="text-sm">View Instructions</Text>
            </>
          );
        case 1:
          return (
            <>
              <TbList className="text-emerald-500 text-base" />
              <Text className="text-sm">Question Paper</Text>
            </>
          );

        default:
          break;
      }
    }
  }

  return (
    <div
      className="h-8 w-screen bg-neutral-800 flex flex-0 justify-between
    items-center px-4 gap-4 outline-1 outline-slate-600 grow-0"
    >
      <Text color={"white"}>Test Paper Name</Text>
      <PaperOptionsGroup />
    </div>
  );
};

export default TestHeader;
