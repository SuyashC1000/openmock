"use client";
import "./globals.css";

import {
  TbBarrierBlock,
  TbBrandGithub,
  TbBrandGithubFilled,
  TbWriting,
} from "react-icons/tb";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Link,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import SiteLogoBlock from "./_components/SiteLogoBlock";
import { fonts } from "./fonts";

export default function AppPage() {
  return (
    <section className={fonts.worksans.className}>
      <div className="fixed top-0 left-0 h-10 p-2 px-10 flex justify-between items-center w-screen bg-slate-100 z-40">
        <Flex alignItems={"center"}>
          <SiteLogoBlock />
        </Flex>
        {/* <Link href="/home">
          <Button colorScheme="green">Get Started</Button>
        </Link> */}
      </div>
      <div
        className="h-screen flex flex-col justify-center items-center gap-2"
        style={{
          // background: `linear-gradient(90deg, rgba(255,91,91,1) 0%, rgba(85,0,255,1) 50%, rgba(75,255,141,1) 100%)`,
          background: `linear-gradient(90deg, rgba(138,0,0,1) 0%, rgba(45,0,136,1) 50%, rgba(0,102,37,1) 100%)`,
        }}
      >
        <h2 className="text-7xl text-white text-center font-extrabold mb-5">
          Welcome to OpenMock!
        </h2>
        <p className="text-2xl text-neutral-200 mb-8">
          Create and attempt test papers for free!
        </p>
        <Link href="/home">
          <Button
            size={"lg"}
            leftIcon={<TbWriting size={20} />}
            colorScheme="green"
          >
            Take a Mock Test now!
          </Button>
        </Link>
        <Text className="underline text-white">NO signup required!</Text>
        <Tag mt={5} size={"lg"} colorScheme="cyan">
          <TagLeftIcon as={TbBarrierBlock} boxSize={6} />
          <TagLabel>This site is under development</TagLabel>
          <TagRightIcon as={TbBarrierBlock} boxSize={6} />
        </Tag>
        {/* <ButtonGroup>
          <Link href="/test">
            <Button colorScheme="blue">Test Interface</Button>
          </Link>
          <Link href="/analysis">
            <Button colorScheme="purple">Analysis Interface</Button>
          </Link>
          <Link href="/creator">
            <Button colorScheme="red">Creator Interface</Button>
          </Link>
        </ButtonGroup> */}
        <div className="absolute bottom-3">
          <Link isExternal href="https://github.com/SuyashC1000/openmock">
            <TbBrandGithub color="white" size={30} />
          </Link>
        </div>
      </div>
      <main className="hidden">
        <p>This marks the beginning of the OpenMock Project</p>
      </main>
    </section>
  );
}
