"use client";

import {
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Icon,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  TbChevronLeft,
  TbChevronRight,
  TbPlug,
  TbPlus,
  TbSettings,
  TbTransferIn,
  TbTransferOut,
  TbUserPlus,
} from "react-icons/tb";
import UserRegisterModal from "./UserRegisterModal";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";
import { usePathname, useRouter } from "next/navigation";

const formatTitleText = (str: string, lower = false): string =>
  (lower ? str.toLowerCase() : str)
    .replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase())
    .replaceAll("-", " ");
const Navbar = () => {
  const router = useRouter();
  const pathnameList = usePathname().substring(1).split("/");

  return (
    <div className="bg-white h-10 flex-0 py-2 px-4 text-slate-800 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Breadcrumb separator={<TbChevronRight />}>
          <BreadcrumbItem>
            <Heading
              size={"md"}
              cursor={"pointer"}
              fontWeight={"semibold"}
              onClick={() => router.push("/home")}
            >
              OpenMock
            </Heading>
            <Badge ml={2} colorScheme="red" variant={"subtle"}>
              Alpha
            </Badge>
          </BreadcrumbItem>
          {pathnameList[0] !== "home" &&
            pathnameList.map((e, i) => (
              <BreadcrumbItem key={i}>
                <BreadcrumbLink
                  href={
                    i < pathnameList.length - 1
                      ? "/" + pathnameList.slice(0, i + 1).join("/")
                      : undefined
                  }
                >
                  {formatTitleText(e)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Navbar;
