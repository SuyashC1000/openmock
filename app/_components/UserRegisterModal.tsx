import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link,
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
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  profileImgSrc: string;
};

const UserRegisterModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [hasAgreed, setHasAgreed] = useState(false);

  const modalOpenRef = React.useRef(null);
  const router = useRouter();

  const handleModalClose = () => {
    setHasAgreed(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: { name: "", profileImgSrc: "" },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newUserData = userDataGenerator(
      data.name,
      data.profileImgSrc,
      "0.1",
      Date.now()
    );
    await db.userData.add(newUserData);
    onClose();
  };

  const formData = watch();

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>New User Registration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex gap-3">
              <div className="flex-1">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    required
                    type="text"
                    size={"sm"}
                    {...register(`name`, {
                      required: "A name must be given",
                      pattern: {
                        // value: /^[a-zA-z]+$/i,
                        value:
                          /^[A-Z][a-z]+(?:\s[A-Z][a-z]+?)?(?:\s[A-Z][a-z]+?)?$/g,
                        message:
                          "Entered name must be either your first name or full name (w/ optional \
                        middle name) and be properly capitalized",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-700 text-sm">
                      {errors.name?.message}
                    </p>
                  )}
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel>Profile Image Link</FormLabel>
                  <Input
                    type="url"
                    size={"sm"}
                    {...register(`profileImgSrc`)}
                  />
                  {errors.profileImgSrc && (
                    <p className="text-red-700 text-sm">
                      {errors.profileImgSrc?.message}
                    </p>
                  )}
                </FormControl>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <Avatar
                  name={formData.name}
                  src={formData.profileImgSrc}
                  size={"2xl"}
                />
                <Text fontSize={"lg"}>
                  {formData.name}
                  {formData.name.length === 0 && (
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
                I have read and agree to the{" "}
                <Link href="/legal/terms-of-service" color={"blue.600"}>
                  Terms of Service
                </Link>{" "}
                and the{" "}
                <Link color={"blue.600"} href="/legal/privacy">
                  Privacy Policy
                </Link>
                .
              </Text>
            </div>
          </ModalBody>
          <ModalFooter justifyContent={"start"}>
            <Button colorScheme="green" isDisabled={!hasAgreed} type="submit">
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UserRegisterModal;
