import { Avatar, Button, Checkbox, Heading, Text } from "@chakra-ui/react";
import React from "react";
import {
  DispatchContext,
  QuestionTimeContext,
  StateContext,
  TestPaperContext,
} from "../page";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import GeneralInstructions from "../GeneralInstructions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  SET_DEFAULT_LANGUAGE,
  SET_START_TIME,
  SET_TEST_STATUS,
  UPDATE_QUESTION_STATUS,
} from "@/app/_formatters/userCacheReducer";

export const PreTestModal = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);
  const setQuestionTime = React.useContext(QuestionTimeContext)[1] as (
    e: any
  ) => void;

  const [pageIndex, setPageIndex] = React.useState(2);
  const [hasAgreed, setHasAgreed] = React.useState(true);

  const specificInstructions =
    testPaper.instructions[state.currentLanguageIndex].length === 0
      ? "There are no other specific instructions."
      : testPaper.instructions[state.currentLanguageIndex];

  const InstructionsHandler = () => {
    if (pageIndex === 1) {
      return (
        <div className="m-5 w-auto">
          <Text className="font-bold text-lg underline text-center mb-3">
            General Instructions
          </Text>
          <GeneralInstructions
            testDuration={testPaper.maxTime}
            calculator={testPaper.additionalTools.calculator}
          />
        </div>
      );
    } else if (pageIndex === 2) {
      return (
        <div className="m-5 w-auto">
          <Text className="font-bold text-lg underline text-center mb-3">
            Other Important Instructions
          </Text>
          <Markdown
            className="p-4"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {specificInstructions}
          </Markdown>
        </div>
      );
    }
  };

  const UserDeclaration = () => {
    return (
      <div className="flex-0 border border-t-2 border-neutral-400 p-4 max-h-52 overflow-y-auto">
        <Text fontSize={"sm"}>
          Choose your default language:{" "}
          <span>
            <select
              className="p-1 border border-1 border-neutral-400 rounded-lg text-sm"
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
                  <option key={i} value={i}>
                    {e}
                  </option>
                );
              })}
            </select>
          </span>
        </Text>
        <Text fontSize={"sm"} className="text-red-500">
          Please note all questions will appear in your default language. This
          language can be changed for a particular question later on.
        </Text>
        <div className=" flex items-start gap-2">
          <Checkbox
            className="my-1 inline-block"
            onChange={() => setHasAgreed(!hasAgreed)}
            isChecked={hasAgreed}
          />
          <div>
            <Text fontSize={"sm"} className="font-semibold">
              Declaration by the candidate:
            </Text>
            <Text fontSize={"sm"}>
              I have read and understood the instructions. All computer hardware
              allotted to me are in proper working condition. I declare that I
              am not in possession of / not wearing / not carrying any
              prohibited gadget like mobile phone, bluetooth devices etc. / any
              prohibited material with me into the Examination Hall. I agree
              that in case of not adhering to the instructions, I shall be
              liable to be debarred from this Test and / or to disciplinary
              action, which may include ban from future Tests / Examinations.
            </Text>
          </div>
        </div>
      </div>
    );
  };

  function handleBeginTest() {
    dispatch({ type: SET_TEST_STATUS, payload: "ongoing" });
    dispatch({ type: SET_START_TIME, payload: Date.now() });
    setQuestionTime([0, 0]);
    dispatch({
      type: UPDATE_QUESTION_STATUS,
      payload: {
        qIndex: 0,
        newStatus: 1,
      },
    });
  }

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen bg-white z-10"
      hidden={state.testStatus !== "starting"}
    >
      <div className="flex flex-row">
        <div className="flex-1 flex flex-col h-screen max-h-screen flex-box">
          <div className="bg-sky-100 p-2 flex flex-0">
            <Heading size={"md"}>{testPaper.name} - Instructions</Heading>
          </div>
          <Text className="text-center m-1 text-red-500 flex-0">
            Please read the following instructions very carefully
          </Text>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <InstructionsHandler />
          </div>
          {pageIndex === 2 && <UserDeclaration />}
          <div className="h-16 outline outline-1 outline-neutral flex items-center justify-between px-3 flex-0">
            <Button
              leftIcon={<TbChevronLeft />}
              variant={"outline"}
              visibility={pageIndex === 2 ? "visible" : "hidden"}
              onClick={() => setPageIndex(1)}
            >
              Previous
            </Button>
            <Button
              colorScheme="blue"
              visibility={pageIndex === 2 ? "visible" : "hidden"}
              isDisabled={!hasAgreed}
              onClick={() => handleBeginTest()}
            >
              I am ready to begin
            </Button>
            <Button
              rightIcon={<TbChevronRight />}
              variant={"outline"}
              visibility={pageIndex === 1 ? "visible" : "hidden"}
              onClick={() => setPageIndex(2)}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="w-64 grow-1 h-screen bg-white outline outline-1 outline-neutral-400 flex flex-col items-center">
          <div className="flex items-center flex-col m-8 gap-2">
            <Avatar size={"xl"} />
            <Text className="font-semibold">{state.userDetails.name}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};
