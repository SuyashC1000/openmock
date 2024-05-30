import { color } from "framer-motion";
import React from "react";

interface Props {
  count: number;
  status: number;
}

const QuestionBtn = (props: Props) => {
  const [count, setCount] = React.useState(props.count);
  const [status, setStatus] = React.useState(props.status);

  const ButtonAccent = () => {
    switch (props.status) {
      case 0:
        return (
          <polygon
            points="10 10, 110 10, 110 90, 10 90, 10 10"
            fill="#f5f5f5"
            stroke="#a3a3a3"
            strokeWidth={5}
          />
        );
      case 1:
        return (
          <polygon
            points="10 10, 110 10, 110 60, 70 90, 50 90, 10 60, 10 10"
            fill="#dc2626"
            stroke="#f87171"
            strokeWidth={5}
          />
        );
      case 2:
        return (
          <polygon
            points="50 10, 70 10, 110 40, 110 90, 10 90, 10 40, 50 10"
            fill="#15803d"
            stroke="#4ade80"
            strokeWidth={5}
          />
        );

      default:
        break;
    }
  };

  const textColor = [1, 2, 3].includes(props.status) ? "white" : "black";
  console.log(textColor);

  React.useEffect(() => {
    setCount(props.count);
    setStatus(props.status);
  }, [props.count, props.status]);

  return (
    <svg
      width={"100%"}
      height={"100%"}
      style={{ margin: "10px" }}
      viewBox="0 0 120 100"
    >
      <ButtonAccent />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fontSize="2rem"
        fill={textColor}
      >
        {count}
      </text>
    </svg>
  );
};

export default QuestionBtn;
