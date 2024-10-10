"use client";

import React from "react";
import PropTypes from "prop-types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { confirmable, createConfirmation } from "../../lib/react-confirm";

interface Props {
  okLabel: string;
  cancelLabel: string;
  title: string;
  confirmation: string;
  show: boolean;
  proceed: Function; // called when ok button is clicked.
}

const Confirmation = ({
  okLabel = "Yes",
  cancelLabel = "Cancel",
  title = "Confirmation",
  confirmation,
  show,
  proceed,
}: Props) => {
  const cancelRef = React.useRef(null);

  return (
    <>
      <AlertDialog
        isOpen={show}
        leastDestructiveRef={cancelRef}
        onClose={() => proceed(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{confirmation}</AlertDialogBody>

            <AlertDialogFooter>
              <ButtonGroup>
                <Button ref={cancelRef} onClick={() => proceed(false)}>
                  {cancelLabel}
                </Button>
                <Button colorScheme="red" onClick={() => proceed(true)}>
                  {okLabel}
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export function confirm(
  confirmation: string,
  proceedLabel = "Yes",
  cancelLabel = "No",
  options = {}
) {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
}
