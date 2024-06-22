import { color } from "framer-motion";
import React from "react";

interface Props {
  count: number;
  status: number;
  active?: boolean;
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
            fill="#65a30d"
            stroke="#a3e635"
            strokeWidth={5}
          />
        );
      case 3:
        return (
          <circle
            cx="60"
            cy="50"
            r="40"
            fill="#7e22ce"
            stroke="#a855f7"
            strokeWidth={5}
          />
        );
      case 4:
        return (
          <>
            <circle
              cx="60"
              cy="50"
              r="40"
              fill="#7e22ce"
              stroke="#a855f7"
              strokeWidth={5}
            />
            <circle cx="85" cy="80" r="15" fill="#65a30d" strokeWidth={5} />
          </>
        );

      default:
        break;
    }
  };

  const textColor = props.status === 0 ? "black" : "white";

  React.useEffect(() => {
    setCount(props.count);
    setStatus(props.status);
  }, [props.count, props.status]);

  return (
    <svg
      width={"100%"}
      height={"100%"}
      viewBox="0 0 120 100"
      className={`select-none ${props.active && "brightness-150"}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ButtonAccent />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="2.4rem"
        fill={textColor}
      >
        {count}
      </text>
    </svg>
  );
};

export default QuestionBtn;
