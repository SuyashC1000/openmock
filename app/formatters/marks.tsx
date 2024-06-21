import React from "react";

export default function marks(rawMarks: number[], type: string = "number") {
  switch (type) {
    case "number":
      return rawMarks[0] / rawMarks[1];

    case "string":
      return `${rawMarks[0] >= 0 ? "+" : ""}${rawMarks[0]}${
        rawMarks[1] === 1 ? "" : "/" + rawMarks[1]
      }`;
    case "element":
      return (
        <span
          className={
            rawMarks[0] > 0
              ? "text-green-600"
              : rawMarks[0] < 0
                ? "text-red-600"
                : "text-neutral-400"
          }
        >
          {rawMarks[0] > 0 ? "+" : ""}
          {rawMarks[0]}
          {rawMarks[1] === 1 ? "" : "/" + rawMarks[1]}
        </span>
      );
  }
}
