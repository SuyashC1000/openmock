"use client";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import sampleRaw from "./sample.md";
import "katex/dist/katex.min.css";

const QuestionView = () => {
  const [markdown, setMarkdown] = React.useState(`
  # Hello
  this is a *man*

  $$1 + 1 = 2$$
  `);

  // React.useEffect(() => {
  //   fetch(sampleRaw)
  //     .then((e) => e.text())
  //     .then((text) => setMarkdown(text));
  // }, []);

  return (
    <div className="p-2 font-serif">
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default QuestionView;
