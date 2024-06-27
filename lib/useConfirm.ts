import { DialogDataProps } from "@/app/test/_modals/ConfirmationModal";
import { DialogDataContext } from "@/app/test/page";
import React, { Dispatch } from "react";

let resolveCallback: (value: unknown) => void;
function useConfirm() {
  const dialogDataState = React.useContext(DialogDataContext);
  const dialogData = dialogDataState[0] as DialogDataProps;
  const setDialogData = dialogDataState[1] as (e: DialogDataProps) => void;

  // const [confirmState, dispatch] = useContext(ConfirmContext);
  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };

  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };
  const confirm = (
    title: string = "Confirm",
    message: string = "Are you sure?"
  ) => {
    setDialogData({ active: true, message: message, title: title });
    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    setDialogData({ active: false, message: "", title: "" });
  };

  return { confirm, onConfirm, onCancel, dialogData };
}

export default useConfirm;
