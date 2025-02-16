





import React from "react";
import AlertModal from "./Alert";
import SuccessModal from "./Success";
import WarningModal from "./Warning";
import ConfirmModal from "./ConfirmModal";


export default function Modal() {
  return (
    <>
      <SuccessModal />
      <AlertModal />
      <WarningModal />
      <ConfirmModal/>
    </>
  );
}
