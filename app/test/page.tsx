import { Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import React, { JSXElementConstructor } from "react";
import { TbInfoCircle, TbInfoCircleFilled, TbList } from "react-icons/tb";

interface Props {
  type: number;
}

const TestPage = () => {
  return (
    <div className="bg-slate-800 flex flex-box flex-col h-screen ">
      <Header />
      <div className="h-auto flex flex-grow w-screen">
        <QuestionWindow />
        <SideBar />
      </div>
      <BottomBar />
    </div>
  );

  function Header() {
    return (
      <div
        className="h-8 w-screen bg-neutral-800 flex flex-0 justify-between
      items-center px-4 gap-4 outline-1 outline-slate-600 grow-0"
      >
        <Text color={"white"}>Test Paper Name</Text>
        <PaperOptionsGroup />
      </div>
    );
  }

  function QuestionWindow() {
    return <div className="bg-white flex-1 "></div>;
  }

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
      <div className="flex items-center gap-1 cursor-pointer hover:bg-neutral-500 p-1 rounded select-none font-medium">
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
              <TbList className="text-emerald-700 text-base" />
              <Text className="text-sm">Question Paper</Text>
            </>
          );

        default:
          break;
      }
    }
  }

  function SideBar() {
    return (
      <div className="w-64 bg-slate-400 flex-0 flex-box flex-col">
        <div className="h-auto px-2 py-1  bg-sky-700">
          <Text className="text-white font-semibold">Hello There</Text>
        </div>
      </div>
    );
  }

  function BottomBar() {
    return (
      <div
        className="h-16 w-screen bg-white flex flex-0 justify-between
       items-center px-4 gap-4 outline outline-1 outline-neutral-400 "
      >
        <ButtonGroup>
          <Button fontWeight={"400"} variant="outline" colorScheme="blue">
            Mark for Review & Next
          </Button>
          <Button fontWeight={"400"} variant="outline" colorScheme="blue">
            Clear Response
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button fontWeight={"400"} variant="outline" colorScheme="blue">
            Previous
          </Button>
          <Button fontWeight={"400"} variant="outline" colorScheme="blue">
            Save & Next
          </Button>
          <Button fontWeight={"400"} colorScheme="blue" className="justify-end">
            Submit
          </Button>
        </ButtonGroup>
      </div>
    );
  }
};

export default TestPage;
