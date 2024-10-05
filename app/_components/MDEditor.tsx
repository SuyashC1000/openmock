import { Card, CardBody, Textarea } from "@chakra-ui/react";
import React from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import MDViewer from "./MDViewer";
import { fonts } from "../fonts";

interface Props {
  isPreview: boolean;
  content: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  fontStyle?: "serif" | "sans";
}

const MDEditor = ({ isPreview, content, onChange, fontStyle }: Props) => {
  return (
    <>
      {isPreview ? (
        <Card size={"sm"} variant={"outline"}>
          <CardBody className="whitespace-pre-wrap">
            <MDViewer content={content} fontStyle={fontStyle} />
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
