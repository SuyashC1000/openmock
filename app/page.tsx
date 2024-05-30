"use client";

import Image from "next/image";
import QuestionBtn from "./components/QuestionBtn";
import { Button, Link } from "@chakra-ui/react";

export default function Home() {
  const Test = () => {
    return (
      <>
        <QuestionBtn count={50} status={0} />
        <QuestionBtn count={250} status={1} />
        <QuestionBtn count={250} status={2} />
      </>
    );
  };

  return (
    <>
      <main>
        <p>This marks the beginning of the OpenMock Project</p>
      </main>
      <div style={{ height: "100px" }} className="flex-col">
        <Test />
        <Link href="/home">
          <Button>Home</Button>
        </Link>
      </div>
    </>
  );
}
