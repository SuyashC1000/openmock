"use client";

import { TbWriting } from "react-icons/tb";

import { Button, ButtonGroup, Link, Text } from "@chakra-ui/react";
import React from "react";

export default function AppPage() {
  const Navbar = () => {
    return (
      <div className="fixed top-0 left-0 h-12 p-2 px-10 flex justify-between items-center w-screen bg-slate-100 z-40">
        <Text className="font-semibold text-xl">OpenMock</Text>
        <Link href="/home">
          <Button colorScheme="green">Get Started</Button>
        </Link>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="h-screen bg-slate-600 flex flex-col justify-center items-center gap-2">
        <h2 className="text-7xl text-center font-extrabold mb-7">
          Take Previous Year Papers <br></br>as Mocks for free!
        </h2>
        <Link href="/home">
          <Button leftIcon={<TbWriting />} colorScheme="green">
            Take a Mock Test now!
          </Button>
        </Link>
        <Text className="underline text-white">NO signup required!</Text>
        <ButtonGroup>
          <Link href="/test">
            <Button colorScheme="blue">Test Interface</Button>
          </Link>
          <Link href="/analysis">
            <Button colorScheme="purple">Analysis Interface</Button>
          </Link>
        </ButtonGroup>
      </div>
      <main>
        <p>This marks the beginning of the OpenMock Project</p>
      </main>
      <div style={{ height: "100px" }} className="flex-col"></div>
    </>
  );
}
