import {
  Avatar,
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
  TbUserPlus,
} from "react-icons/tb";

const Navbar = ({ page }: { page: string }) => {
  return (
    <div className="bg-slate-600 h-10 flex-0 py-2 px-4 text-white flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link href={"./home"}>
          <Heading size={"md"} fontWeight={"semibold"}>
            OpenMock
          </Heading>
        </Link>
        <Icon as={TbChevronRight} />
        <Text>{page}</Text>
      </div>
      <div>
        <Popover placement="bottom-end" offset={[-10, 10]}>
          <PopoverTrigger>
            <Avatar size={"sm"} src="" cursor={"pointer"} />
          </PopoverTrigger>
          <PopoverContent rounded={"xl"} shadow={"lg"} color="black">
            <PopoverBody>
              <VStack gap={2} alignItems={"start"}>
                <VStack gap={1} alignItems={"center"} w={"full"}>
                  <Avatar size={"xl"} src="" />
                  <Text fontSize={"lg"}>User</Text>
                </VStack>
                <ButtonGroup w={"full"} className="flex">
                  <Button flex={1} variant={"outline"} leftIcon={<TbPlus />}>
                    Register
                  </Button>
                  <Button
                    flex={1}
                    variant={"outline"}
                    leftIcon={<TbTransferIn />}
                  >
                    Import
                  </Button>
                </ButtonGroup>
                <Button
                  w={"full"}
                  variant={"outline"}
                  leftIcon={<TbSettings />}
                >
                  Settings
                </Button>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
