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

const Navbar = ({ page }: { page: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchedUserData = useLiveQuery(async () => await db.userData.toArray());
  const userData =
    fetchedUserData !== undefined ? fetchedUserData[0] : undefined;

  return (
    <div className="bg-slate-600 h-10 flex-0 py-2 px-4 text-white flex justify-between items-center">
      <UserRegisterModal isOpen={isOpen} onClose={onClose} />
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
        <Popover placement="bottom-end" offset={[-10, 10]} closeOnBlur>
          <PopoverTrigger>
            <Avatar
              size={"sm"}
              name={userData?.profile.username ?? ""}
              src={userData?.profile.imageSrc ?? ""}
              cursor={"pointer"}
            />
          </PopoverTrigger>
          <PopoverContent rounded={"xl"} shadow={"lg"} color="black">
            <PopoverBody>
              <VStack gap={2} alignItems={"start"}>
                <VStack gap={1} alignItems={"center"} w={"full"}>
                  <Avatar
                    size={"xl"}
                    name={userData?.profile.username ?? ""}
                    src={userData?.profile.imageSrc ?? ""}
                  />
                  <Text fontSize={"lg"}>
                    {userData?.profile.username ?? (
                      <span className="italic">Anonymous User</span>
                    )}
                  </Text>
                </VStack>
                <ButtonGroup w={"full"} className="flex">
                  {userData !== undefined ? (
                    <Button
                      flex={1}
                      variant={"outline"}
                      leftIcon={<TbTransferOut />}
                    >
                      Export
                    </Button>
                  ) : (
                    <>
                      <Button
                        flex={1}
                        variant={"outline"}
                        leftIcon={<TbPlus />}
                        onClick={onOpen}
                      >
                        Register
                      </Button>
                      <Button
                        flex={1}
                        variant={"outline"}
                        leftIcon={<TbTransferIn />}
                      >
                        Import
                      </Button>
                    </>
                  )}
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
