import { createContext, useContext, useEffect, useRef } from "react";

export interface DialogStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const DialogContext = createContext<DialogStore>(null!);
export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogRoot");
  }
  return context;
};

/**
 * Controller for the dialog element
 */
export const useDialogControl = ({ open, setOpen }: DialogStore) => {
  const ref = useRef<HTMLDialogElement>(null!);

  useEffect(() => {
    if (open) {
      ref.current.showModal();
    } else {
      ref.current.close("dismiss");
    }
  }, [open]);

  useEffect(() => {
    const { current: dialog } = ref;
    const closeHandler = () => {
      setOpen(false);
    };
    const clickHandler = ({ target: dialogTarget }: MouseEvent) => {
      if (dialogTarget === dialog) {
        dialog.close("dismiss");
      }
    };

    dialog.addEventListener("close", closeHandler);
    dialog.addEventListener("click", clickHandler);

    return () => {
      dialog.removeEventListener("close", closeHandler);
      dialog.removeEventListener("click", clickHandler);
    };
  }, [setOpen]);

  return {
    open,
    setOpen,
    ref,
  };
};
