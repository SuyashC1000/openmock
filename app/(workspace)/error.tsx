"use client";

import {
  Card,
  CardBody,
  Code,
  Divider,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbMoodSadDizzy } from "react-icons/tb";
import ErrorCard from "../_components/ErrorCard";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isErrorMsgVisible, setIsErrorMsgVisible] = useState(false);

  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center my-auto">
      <ErrorCard
        title="Fatal Error Encountered"
        description="Please check the console log for more info."
        icon={TbMoodSadDizzy}
        bgColor="red.100"
        iconColor="red.400"
      />
    </main>
  );
}
