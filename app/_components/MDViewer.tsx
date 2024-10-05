import React from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface Props {
  content: string;
  fontStyle?: "serif" | "sans";
}

const MDViewer = ({ content, fontStyle = "sans" }: Props) => {
  return (
    <Markdown
      className={`font-${fontStyle} text-lg`}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {content}
    </Markdown>
  );
};

export default MDViewer;
