import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";
import { TbCalculator, TbZoomIn, TbZoomOut } from "react-icons/tb";

function ToolsButtons() {
  return (
    <ButtonGroup className="text-orange-500">
      <IconButton
        icon={<TbZoomIn />}
        aria-label="Zoom in"
        fontSize={"xl"}
        className="text-lg"
      />
      <IconButton
        icon={<TbZoomOut />}
        aria-label="Zoom out"
        fontSize={"xl"}
        className="text-lg"
      />
      <IconButton
        icon={<TbCalculator />}
        aria-label="Scientific calculator"
        fontSize={"xl"}
        className="text-lg"
      />
    </ButtonGroup>
  );
}

export default ToolsButtons;
