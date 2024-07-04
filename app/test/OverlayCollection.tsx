import React from "react";
import { PreTestModal } from "./_modals/PreTestModal";
import SubmitTestModal from "./_modals/SubmitTestModal";
import ConfirmationModal from "./_modals/ConfirmationModal";
import Calculator from "./_misc/Calculator";

const OverlayCollection = () => {
  return (
    <>
      <PreTestModal />
      <SubmitTestModal />
      <ConfirmationModal />
      <Calculator />
    </>
  );
};

export default OverlayCollection;
