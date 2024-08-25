import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { userDataGenerator } from "../_functions/userDataGenerator";
import { db } from "@/db/db";
import { useRouter } from "next/navigation";

const UserRegisterModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [username, setUsername] = useState("");
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const isUsernameError =
    username.length < 3 ||
    username.length > 15 ||
    !username.match(/^[a-zA-Z_$][\w$]*$/i);

  const [profileImgSrc, setProfileImgSrc] = useState("");
  const handleProfileImgSrcChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setProfileImgSrc(event.target.value);
  const isProfileImgSrcError = false;

  const [hasAgreed, setHasAgreed] = useState(false);

  const modalOpenRef = React.useRef(null);
  const router = useRouter();

  const handleModalClose = () => {
    setUsername("");
    setProfileImgSrc("");
    setHasAgreed(false);
  };

  const handleModalSubmit = async () => {
    const newUserData = userDataGenerator(
      username,
      profileImgSrc,
      "0.1",
      Date.now()
    );
    await db.userData.add(newUserData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"5xl"}
      scrollBehavior="inside"
      preserveScrollBarGap
      initialFocusRef={modalOpenRef}
      onCloseComplete={handleModalClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New User Registration</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex gap-3">
            <div className="flex-1">
              <FormControl isRequired isInvalid={isUsernameError}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  maxLength={25}
                  isRequired
                  size={"sm"}
                  onChange={handleUsernameChange}
                  ref={modalOpenRef}
                />

                <FormHelperText>
                  Username must adhere to the following:
                  <UnorderedList>
                    <ListItem>Be within 3 and 15 characters</ListItem>
                    <ListItem>Consist of only letters and numbers </ListItem>
                    <ListItem>Not start with a number </ListItem>
                  </UnorderedList>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl isInvalid={isProfileImgSrcError}>
                <FormLabel>Profile Image Link</FormLabel>
                <Input
                  type="url"
                  size={"sm"}
                  onChange={handleProfileImgSrcChange}
                />
              </FormControl>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <Avatar name={username} src={profileImgSrc} size={"2xl"} />
              <Text fontSize={"lg"}>
                {username}
                {username.length === 0 && (
                  <span className="text-neutral-500">(Empty)</span>
                )}
              </Text>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Checkbox
              isChecked={hasAgreed}
              size={"lg"}
              onChange={() => setHasAgreed((e) => !e)}
            />
            <Text>
              I have read and agree to the Terms of Conditions and the Privacy
              Policy.
            </Text>
          </div>
        </ModalBody>
        <ModalFooter justifyContent={"start"}>
          <Button
            colorScheme="green"
            isDisabled={!hasAgreed || isUsernameError || isProfileImgSrcError}
            onClick={async () => {
              handleModalSubmit();
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserRegisterModal;
