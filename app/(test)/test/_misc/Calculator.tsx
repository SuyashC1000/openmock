import React, { useState } from "react";
import {
  TestDispatchContext,
  TestStateContext,
  TestPaperContext,
} from "../page";
import Draggable from "react-draggable";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CloseButton,
  IconButton,
  Input,
  ListItem,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Text,
  UnorderedList,
  calc,
} from "@chakra-ui/react";
import { TbMinus, TbQuestionMark, TbX } from "react-icons/tb";
import { SET_CALCULATOR_VISIBILITY } from "@/app/_functions/userCacheReducer";

const Calculator = () => {
  const state = React.useContext(TestStateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(TestDispatchContext);

  const [viewState, setViewState] = useState([true, false]);
  const [calcLog, setCalcLog] = useState("");
  const [isDone, setIsDone] = useState(0);
  const [isUnary, setIsUnary] = useState(false);
  const [numInput, setNumInput] = useState("0");
  const [memory, setMemory] = useState<string | null>(null);
  const [isDeg, setIsDeg] = useState(true);
  const [cursor, setCursor] = useState(0);

  const isAdv = testPaper.additionalTools.calculator === "scientific";

  function fitString(
    oldString: string,
    insertedString: string,
    position: number
  ) {
    const output = [
      oldString.slice(0, position),
      insertedString,
      oldString.slice(position),
    ].join("");
    return output;
  }

  function addValue(inputChar: string) {
    let newInput: string = numInput === "0" ? "" : numInput;
    if (isDone == 0) {
      if (newInput !== ".") {
        newInput += inputChar;
      } else {
        newInput = inputChar;
        setIsDone(0);
      }
    } else if (isDone == 1) {
      newInput = inputChar;
      setIsDone(0);
    } else if (isDone == 2) {
      setCalcLog("");
      newInput = inputChar;
      setIsDone(0);
    }
    setNumInput(newInput);
  }

  function addOperator(
    inputExpr: string,
    cursors: [number, number] = [0, 0],
    isInputUnary: boolean = false
  ) {
    if (isDone == 0) {
      const intermediateCalcLog = isUnary
        ? calcLog
        : fitString(calcLog, numInput, cursor);
      const finalCalcLog = fitString(
        inputExpr,
        intermediateCalcLog,
        cursors[0]
      );
      setCalcLog(finalCalcLog);
      setCursor(finalCalcLog.length - cursors[1]);
    }
    if (!isInputUnary) setIsDone(1);
    setIsUnary(isInputUnary);
  }

  function toggleInputSign() {
    if (numInput.includes("-")) {
      setNumInput(numInput.substring(1, numInput.length));
    } else {
      setNumInput("-" + numInput);
    }
  }

  function clearInput() {
    setNumInput("0");
    setCalcLog("");
    setIsDone(0);
    setIsUnary(false);
  }

  function backspaceInput() {
    if (isDone == 0) {
      if (numInput.length !== 1) {
        setNumInput(numInput.substring(0, numInput.length - 1));
      } else {
        setNumInput("0");
      }
    }
  }

  function calculateInput() {
    if (isDone == 0) {
      const finalOutput = isUnary
        ? calcLog
        : fitString(calcLog, numInput, cursor);
      setCalcLog(finalOutput);
      try {
        setNumInput(eval(finalOutput));
      } catch {
        setNumInput("Invalid expression!");
      }
      console.log(finalOutput);
    } else if (isDone == 1) {
    }

    setIsDone(2);
    setIsUnary(false);
  }

  function reciproc(num: number): number {
    return 1 / num;
  }
  function percent(num1: number, num2: number): number {
    return (num1 * num2) / 100;
  }
  function sqr(num: number): number {
    return num ** 2;
  }
  function cube(num: number): number {
    return num ** 3;
  }
  function sqrt(num: number): number {
    return Math.sqrt(num);
  }
  function cbrt(num: number): number {
    return Math.cbrt(num);
  }
  function pow(num1: number, num2: number): number {
    return num1 ** num2;
  }
  function root(num1: number, num2: number): number {
    return num1 ** (1 / num2);
  }
  function powe(num: number): number {
    return Math.exp(num);
  }
  function powten(num: number): number {
    return 10 ** num;
  }
  function log(num: number): number {
    return Math.log10(num);
  }
  function ln(num: number): number {
    return Math.log(num);
  }
  function logBase2(num: number): number {
    return Math.log2(num);
  }
  function abs(num: number): number {
    return Math.abs(num);
  }
  function fact(num: number): number {
    if (num === 0) {
      return 1;
    }
    return num * fact(num - 1);
  }
  function modulo(num1: number, num2: number): number {
    return num1 % num2;
  }
  function exp(num1: number, num2: number): number {
    return num1 * 10 ** num2;
  }
  function sinr(num: number): number {
    return Math.sin(num);
  }
  function cosr(num: number): number {
    return Math.cos(num);
  }
  function tanr(num: number): number {
    return Math.tan(num);
  }
  function sind(num: number): number {
    const newNum = num * (Math.PI / 180);
    return Math.sin(newNum);
  }
  function cosd(num: number): number {
    const newNum = num * (Math.PI / 180);
    return Math.cos(newNum);
  }
  function tand(num: number): number {
    const newNum = num * (Math.PI / 180);
    return Math.tan(newNum);
  }
  function asinr(num: number): number {
    return Math.asin(num);
  }
  function acosr(num: number): number {
    return Math.acos(num);
  }
  function atanr(num: number): number {
    return Math.atan(num);
  }
  function asind(num: number): number {
    const valInRad = Math.asin(num);
    return valInRad * (180 / Math.PI);
  }
  function acosd(num: number): number {
    const valInRad = Math.acos(num);
    return valInRad * (180 / Math.PI);
  }
  function atand(num: number): number {
    const valInRad = Math.atan(num);
    return valInRad * (180 / Math.PI);
  }
  function sinhd(num: number): number {
    return Math.sinh(num);
  }
  function coshd(num: number): number {
    return Math.cosh(num);
  }
  function tanhd(num: number): number {
    return Math.tanh(num);
  }
  function asinhr(num: number): number {
    return Math.asinh(num);
  }
  function acoshr(num: number): number {
    return Math.acosh(num);
  }
  function atanhr(num: number): number {
    return Math.atanh(num);
  }
  function asinhd(num: number): number {
    return Math.asinh(num);
  }
  function acoshd(num: number): number {
    return Math.acosh(num);
  }
  function atanhd(num: number): number {
    return Math.atanh(num);
  }

  return (
    <>
      <span
        className="fixed z-50 h-0 w-0 
      "
      >
        {state.preferences.calculator && (
          <Draggable
            defaultPosition={{ x: 200, y: 200 }}
            handle=".handle"
            allowAnyClick={true}
          >
            <Card
              w={
                testPaper.additionalTools.calculator === "scientific"
                  ? 600
                  : 300
              }
              h={viewState[0] ? 335 : "fit"}
              borderColor={"lightgrey"}
              borderWidth={2}
              fontSize={"sm"}
            >
              <CardHeader
                p={1}
                className="p-1 flex justify-between items-center handle cursor-move"
              >
                <Text>
                  {testPaper.additionalTools.calculator === "scientific"
                    ? "Scientific "
                    : ""}
                  Calculator
                </Text>
                <ButtonGroup>
                  <IconButton
                    size={"sm"}
                    aria-label="Help"
                    onClick={() => {
                      setViewState((e) => [e[0], !e[1]]);
                    }}
                    icon={<TbQuestionMark />}
                  />
                  <IconButton
                    size={"sm"}
                    aria-label="Minimize Calculator"
                    onClick={() => {
                      setViewState((e) => [!e[0], e[1]]);
                    }}
                    icon={<TbMinus />}
                  />
                  <IconButton
                    size={"sm"}
                    aria-label="Close Calculator"
                    icon={<TbX />}
                    onClick={() => {
                      dispatch({
                        type: SET_CALCULATOR_VISIBILITY,
                        payload: false,
                      });
                    }}
                  />
                </ButtonGroup>
              </CardHeader>
              {viewState[0] && !viewState[1] && (
                <CardBody p={2} className="bg-neutral-200 flex flex-col gap-2 ">
                  <Input
                    size={"sm"}
                    bgColor={"white"}
                    readOnly
                    type="string"
                    value={calcLog}
                    textAlign={"end"}
                    fontSize={"lg"}
                  />
                  <Input
                    size={"sm"}
                    bgColor={"white"}
                    readOnly
                    type="string"
                    value={numInput}
                    textAlign={"end"}
                    fontSize={"lg"}
                  />
                  {testPaper.additionalTools.calculator === "scientific" && (
                    <div
                      id="scientific-input"
                      className="grid grid-cols-11 grid-rows-6 gap-1 grid-flow-row-dense
                      *:p-1 [&>*]:rounded-md [&>*]:font-semibold
                      hover:[&>*]:brightness-110 active:[&>*]:brightness-75"
                    >
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("modulo(,)", [7, 1])}
                      >
                        mod
                      </button>
                      <RadioGroup
                        className="col-span-4 flex gap-3"
                        value={isDeg ? "deg" : "rad"}
                      >
                        <Radio
                          value={"deg"}
                          size={"sm"}
                          onClick={() => setIsDeg(true)}
                        >
                          Deg
                        </Radio>
                        <Radio
                          value={"rad"}
                          size={"sm"}
                          onClick={() => setIsDeg(false)}
                        >
                          Rad
                        </Radio>
                      </RadioGroup>
                      <div>{memory !== null && <Text>M</Text>}</div>
                      <button
                        className="bg-neutral-100"
                        onClick={() => setMemory(null)}
                      >
                        MC
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => {
                          if (memory !== null) setNumInput(memory);
                        }}
                      >
                        MR
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => {
                          setMemory(numInput);
                        }}
                      >
                        MS
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => {
                          if (memory !== null) {
                            setMemory(
                              String(Number(memory) + Number(numInput))
                            );
                          } else {
                            setMemory(numInput);
                          }
                        }}
                      >
                        M+
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => {
                          if (memory !== null) {
                            setMemory(
                              String(Number(memory) - Number(numInput))
                            );
                          } else {
                            setMemory("-" + numInput);
                          }
                        }}
                      >
                        M-
                      </button>

                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(
                            `sinh${isDeg ? "d" : "r"}()`,
                            [6, 0],
                            true
                          )
                        }
                      >
                        sinh
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(
                            `cosh${isDeg ? "d" : "r"}()`,
                            [6, 0],
                            true
                          )
                        }
                      >
                        cosh
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(
                            `tanh${isDeg ? "d" : "r"}()`,
                            [6, 0],
                            true
                          )
                        }
                      >
                        tanh
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("exp(,)", [4, 1])}
                      >
                        Exp
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("(")}
                      >
                        (
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue(")")}
                      >
                        )
                      </button>
                      <button
                        className="bg-red-400 col-span-2"
                        onClick={() => backspaceInput()}
                      >
                        ⌫
                      </button>
                      <button
                        className="bg-red-400"
                        onClick={() => {
                          clearInput();
                        }}
                      >
                        C
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => toggleInputSign()}
                      >
                        +/-
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("sqrt()", [5, 0], true)}
                      >
                        √
                      </button>

                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(
                            `asinh${isDeg ? "d" : "r"}()`,
                            [7, 0],
                            true
                          )
                        }
                      >
                        sinh⁻¹
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(
                            `acosh${isDeg ? "d" : "r"}()`,
                            [7, 0],
                            true
                          )
                        }
                      >
                        cosh⁻¹
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(
                            `atanh${isDeg ? "d" : "r"}()`,
                            [7, 0],
                            true
                          )
                        }
                      >
                        tanh⁻¹
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("logBase2()", [9, 0], true)}
                      >
                        log₂x
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("ln()", [3, 0], true)}
                      >
                        ln
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("log()", [4, 0], true)}
                      >
                        log
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("7")}
                      >
                        7
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("8")}
                      >
                        8
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("9")}
                      >
                        9
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("/")}
                      >
                        /
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("percent(,)", [8, 1])}
                      >
                        %
                      </button>

                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue(Math.PI.toString())}
                      >
                        π
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue(Math.E.toString())}
                      >
                        e
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("fact()", [5, 0], true)}
                      >
                        n!
                      </button>
                      <button className="bg-neutral-100">logₓy</button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("powe()", [5, 0], true)}
                      >
                        eˣ
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("powten()", [7, 0], true)}
                      >
                        10ˣ
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("4")}
                      >
                        4
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("5")}
                      >
                        5
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("6")}
                      >
                        6
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("*")}
                      >
                        *
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("reciproc()", [9, 0], true)}
                      >
                        1/x
                      </button>

                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(`sin${isDeg ? "d" : "r"}()`, [5, 0], true)
                        }
                      >
                        sin
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(`cos${isDeg ? "d" : "r"}()`, [5, 0], true)
                        }
                      >
                        cos
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(`tan${isDeg ? "d" : "r"}()`, [5, 0], true)
                        }
                      >
                        tan
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("pow(,)", [4, 1])}
                      >
                        xʸ
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("cube()", [5, 0], true)}
                      >
                        {" "}
                        x³
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("sqr()", [4, 0], true)}
                      >
                        x²
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("1")}
                      >
                        1
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("2")}
                      >
                        2
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("3")}
                      >
                        3
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("-")}
                      >
                        -
                      </button>
                      <button
                        className="bg-green-400 row-span-2"
                        onClick={() => calculateInput()}
                      >
                        =
                      </button>

                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(
                            `asin${isDeg ? "d" : "r"}()`,
                            [6, 0],
                            true
                          )
                        }
                      >
                        sin⁻¹
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(
                            `acos${isDeg ? "d" : "r"}()`,
                            [6, 0],
                            true
                          )
                        }
                      >
                        cos⁻¹
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() =>
                          addOperator(
                            `atan${isDeg ? "d" : "r"}()`,
                            [6, 0],
                            true
                          )
                        }
                      >
                        tan⁻¹
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("root(,)", [5, 1])}
                      >
                        ʸ√x
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("cbrt()", [5, 0], true)}
                      >
                        ³√x
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("abs()", [4, 0], true)}
                      >
                        |x|
                      </button>
                      <button
                        className="bg-neutral-100 col-span-2"
                        onClick={() => addValue("0")}
                      >
                        0
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue(".")}
                      >
                        .
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("+")}
                      >
                        +
                      </button>
                    </div>
                  )}
                  {testPaper.additionalTools.calculator === "normal" && (
                    <div
                      id="basic-input"
                      className="grid grid-flow-row-dense grid-cols-5 grid-rows-6 gap-1
                  *:p-1 [&>*]:rounded-md [&>*]:font-semibold
                  hover:[&>*]:brightness-110 active:[&>*]:brightness-75"
                    >
                      <button
                        className="bg-neutral-100"
                        onClick={() => setMemory(null)}
                      >
                        MC
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => {
                          if (memory !== null) setNumInput(memory);
                        }}
                      >
                        MR
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => {
                          setMemory(numInput);
                        }}
                      >
                        MS
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => {
                          if (memory !== null) {
                            setMemory(
                              String(Number(memory) + Number(numInput))
                            );
                          } else {
                            setMemory(numInput);
                          }
                        }}
                      >
                        M+
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => {
                          if (memory !== null) {
                            setMemory(
                              String(Number(memory) - Number(numInput))
                            );
                          } else {
                            setMemory("-" + numInput);
                          }
                        }}
                      >
                        M-
                      </button>
                      <button
                        className="bg-red-400 col-span-2"
                        onClick={() => backspaceInput()}
                      >
                        ⌫
                      </button>
                      <button
                        className="bg-red-400"
                        onClick={() => {
                          clearInput();
                        }}
                      >
                        C
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => toggleInputSign()}
                      >
                        +/-
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("sqrt()", [5, 0], true)}
                      >
                        √
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("7")}
                      >
                        7
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("8")}
                      >
                        8
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("9")}
                      >
                        9
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("/")}
                      >
                        /
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("percent(,)", [8, 1])}
                      >
                        %
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("4")}
                      >
                        4
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("5")}
                      >
                        5
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("6")}
                      >
                        6
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("*")}
                      >
                        *
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("reciproc()", [9, 0], true)}
                      >
                        1/x
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("1")}
                      >
                        1
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("2")}
                      >
                        2
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue("3")}
                      >
                        3
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("-")}
                      >
                        -
                      </button>
                      <button
                        className="bg-green-400 row-span-2"
                        onClick={() => calculateInput()}
                      >
                        =
                      </button>{" "}
                      <button
                        className="bg-neutral-100 col-span-2"
                        onClick={() => addValue("0")}
                      >
                        0
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addValue(".")}
                      >
                        .
                      </button>
                      <button
                        className="bg-neutral-100"
                        onClick={() => addOperator("+")}
                      >
                        +
                      </button>
                    </div>
                  )}
                </CardBody>
              )}
              {viewState[0] && viewState[1] && (
                <CardBody
                  p={2}
                  className="bg-neutral-100 flex flex-col gap-2 overflow-y-auto"
                >
                  <Text className="text-center text-lg font-bold">
                    Calculator Instructions
                  </Text>
                  <Text>
                    Allows you to perform basic {isAdv && "and complex "}
                    mathematical operations.
                  </Text>
                  <Text>
                    You can operate the calculator using the buttons provided on
                    screen with your mouse.
                  </Text>
                  <Text className="text-green-600 text-lg underline">
                    Do&apos;s:
                  </Text>
                  <UnorderedList>
                    <ListItem>
                      <Text>
                        Be sure to press [C] when beginning a new calculation.
                      </Text>
                    </ListItem>
                    {isAdv && (
                      <>
                        <ListItem>
                          <Text>
                            You can simplify an equation using parenthesis and
                            other mathematical operators.
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text>
                            Use the predefined operations such as p (Pi), log,
                            Exp to save time during calculation.
                          </Text>
                        </ListItem>
                      </>
                    )}
                    <ListItem>
                      <Text>
                        Use memory function for calculating cumulative totals.
                      </Text>
                      <strong>
                        <Text>[M+]: Will add displayed value to memory.</Text>
                        <Text>
                          [MR]: Will recall the value stored in memory.
                        </Text>
                        <Text>
                          [M-]: Will subtract the displayed value from memory.
                        </Text>
                      </strong>
                    </ListItem>
                    {isAdv && (
                      <ListItem>
                        <Text>
                          Be sure select the angle unit (Deg or Rad) before
                          beginning any calculation.
                        </Text>
                        <strong>
                          <Text>
                            Note: By default angle unit is set as Degree.
                          </Text>
                        </strong>
                      </ListItem>
                    )}
                  </UnorderedList>
                  <Text className="text-red-600 text-lg underline">
                    Dont&apos;s:
                  </Text>
                  <UnorderedList>
                    <ListItem>
                      <Text>Perform multiple operations together.</Text>
                    </ListItem>
                    {isAdv && (
                      <>
                        <ListItem>
                          <Text>Leave parenthesis unbalanced.</Text>
                        </ListItem>
                        <ListItem>
                          <Text>
                            Change the angle unit (Deg or Rad) while performing
                            a calculation.
                          </Text>
                        </ListItem>
                      </>
                    )}
                  </UnorderedList>
                  <Text className="text-lg underline">Limitations:</Text>
                  <UnorderedList>
                    <ListItem>
                      <Text>Keyboard operation is disabled.</Text>
                    </ListItem>
                    {isAdv && (
                      <>
                        <ListItem>
                          <Text>
                            The output for a Factorial calculation is precise up
                            to 14 digits.
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text>
                            digits. 5 to up precise is calculations Hyperbolic
                            and Logarithmic for output The
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text>
                            Modulo (mod) operation performed on decimal numbers
                            with 15 digits would not be precise.
                          </Text>
                          <strong>
                            <Text>
                              Use mod operation only if the number comprises of
                              less than 15 digits i.e. mod operation provides
                              best results for smaller numbers.
                            </Text>
                          </strong>
                        </ListItem>
                      </>
                    )}
                    <ListItem>
                      <Text>
                        The range of value supported by the calculator is
                        10^(-323) to 10^(308).
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </CardBody>
              )}
            </Card>
          </Draggable>
        )}
      </span>
    </>
  );
};

export default Calculator;
