import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib";

interface Props {
  icon: IconType;
  title: string;
  description: string;
  bgColor?: string;
  iconColor?: string;
}

const ErrorCard = ({ icon, title, description, bgColor, iconColor }: Props) => {
  return (
    <main className="flex h-full flex-col items-center justify-center my-auto">
      <Card size={"lg"} maxW={"2xl"} textAlign={"center"} bgColor={bgColor}>
        <CardBody>
          <Icon as={icon} boxSize={"90px"} color={iconColor ?? "black"} />
          <Heading size={"lg"}>{title}</Heading>
          <Text>{description}</Text>
          <br />
          <Link href={"./home"}>
            <Button colorScheme="blackAlpha">Return home</Button>
          </Link>
        </CardBody>
      </Card>
    </main>
  );
};

export default ErrorCard;
