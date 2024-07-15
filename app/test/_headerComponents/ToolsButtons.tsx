import { Button, ButtonGroup, Icon, Tooltip } from "@chakra-ui/react";
import React from "react";
import { TbCalculator, TbZoomIn, TbZoomOut } from "react-icons/tb";
import { DispatchContext, StateContext, TestPaperContext } from "../page";
import {
  SET_CALCULATOR_VISIBILITY,
  SET_ZOOM_LEVEL,
} from "@/app/_formatters/userCacheReducer";

function ToolsButtons() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const testPaper = React.useContext(TestPaperContext);

  function incDecZoomLevel(i: number): void {
    const newZoomLevel = (state.preferences.zoomLevel += i);
    if (newZoomLevel >= 1 && newZoomLevel <= 3)
      dispatch({ type: SET_ZOOM_LEVEL, payload: newZoomLevel });
  }

  function toggleCalculator() {
    dispatch({
      type: SET_CALCULATOR_VISIBILITY,
      payload: !state.preferences.calculator,
    });
  }

  return (
    <ButtonGroup>
      {testPaper.additionalTools.magnifyingGlass && (
        <Tooltip label="Zoom in" openDelay={400}>
          <Button
            fontSize={"2xl"}
            isDisabled={state.preferences.zoomLevel === 3}
            px={2}
            bgColor={"transparent"}
            aria-label="Zoom in"
            color={"#db7f00"}
            mx={0}
            _hover={{ bgColor: "#c1c1c1" }}
            onClick={() => incDecZoomLevel(1)}
          >
            <Icon as={TbZoomIn} />
          </Button>
        </Tooltip>
      )}
      {testPaper.additionalTools.magnifyingGlass && (
        <Tooltip label="Zoom out" openDelay={400}>
          <Button
            fontSize={"2xl"}
            isDisabled={state.preferences.zoomLevel === 1}
            px={2}
            bgColor={"transparent"}
            aria-label="Zoom out"
            color={"#db7f00"}
            mx={0}
            _hover={{ bgColor: "#c1c1c1" }}
            onClick={() => incDecZoomLevel(-1)}
          >
            <Icon as={TbZoomOut} />
          </Button>
        </Tooltip>
      )}
      {testPaper.additionalTools.calculator !== "none" && (
        <Tooltip label="Toggle Calculator" openDelay={400}>
          <Button
            fontSize={"2xl"}
            px={2}
            bgColor={"transparent"}
            aria-label="Toggle Calculator"
            color={"#db7f00"}
            mx={0}
            _hover={{ bgColor: "#c1c1c1" }}
            onClick={() => toggleCalculator()}
          >
            <Icon as={TbCalculator} />
          </Button>
        </Tooltip>
      )}
    </ButtonGroup>
  );
}

export default ToolsButtons;
