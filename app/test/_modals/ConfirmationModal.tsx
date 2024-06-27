import {
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { DialogDataContext } from "../page";
import useConfirm from "@/lib/useConfirm";

export interface DialogDataProps {
  active: boolean;
  title: string;
  message: string;
}

const ConfirmationModal = () => {
  const { onConfirm, onCancel, dialogData } = useConfirm();

  const cancelRef = React.useRef(null);
  return (
    <AlertDialog
      isOpen={dialogData.active}
      leastDestructiveRef={cancelRef}
      onClose={() => {}}
      isCentered
    >
      <AlertDialogOverlay className="bg-black opacity-25">
        <AlertDialogContent className="bg-red-200 w-5">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {dialogData.title}
          </AlertDialogHeader>

          <AlertDialogBody fontSize={"sm"}>
            {dialogData.message}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onConfirm}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationModal;
