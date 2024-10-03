import { Card, CardBody, Textarea } from "@chakra-ui/react";
import React from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface Props {
  isPreview: boolean;
  content: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
}

const MDEditor = ({ isPreview, content, onChange }: Props) => {
  return (
    <>
      {isPreview ? (
        <Card size={"sm"} variant={"outline"}>
          <CardBody className="whitespace-pre-wrap">
            <Markdown
              className={`font-serif text-lg`}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {content}
            </Markdown>
          </CardBody>
        </Card>
      ) : (
        <Textarea
          value={content}
          onChange={onChange}
          // onBlur={(f) => {}}
        />
      )}
    </>
  );
};

export default MDEditor;
