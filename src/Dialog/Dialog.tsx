import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./index.module.css";
import { DialogContext, useDialogContext, useDialogControl } from "./context";

const cn = (...classes: unknown[]) => classes.filter(Boolean).join(" ");

type AsChild = {
  asChild?: boolean;
};

type RootProps = {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
export const DialogRoot = ({
  children,
  open: externalOpen,
  onOpenChange,
}: RootProps) => {
  const [open, setOpen] = useState(false);

  const setOpenState = useCallback(
    (newOpen: boolean) => {
      onOpenChange?.(newOpen);
      setOpen(newOpen);
    },
    [onOpenChange]
  );

  const preferredOpen = typeof externalOpen === "boolean" ? externalOpen : open;

  return (
    <DialogContext.Provider
      value={{ open: preferredOpen, setOpen: setOpenState }}
    >
      {children}
    </DialogContext.Provider>
  );
};

type ContentProps = React.ComponentProps<"dialog">;

export const DialogContent = forwardRef<HTMLDialogElement, ContentProps>(
  ({ children, className, ...props }, extRef) => {
    const { open, setOpen } = useDialogContext();

    const { ref } = useDialogControl({ open, setOpen });
    useImperativeHandle(extRef, () => ref.current);

    // a11y props
    const ariaProps = { inert: !open ? "" : undefined, "aria-hidden": !open };

    return (
      <dialog
        {...props}
        {...ariaProps}
        className={cn(className, styles.dialog)}
        ref={ref}
      >
        {children}
      </dialog>
    );
  }
);

type TriggerProps = React.ComponentProps<"button"> & AsChild;
export const DialogTrigger = ({
  children,
  asChild,
  ...props
}: TriggerProps) => {
  const { setOpen } = useDialogContext();
  const Component = asChild ? Slot : "button";
  return (
    <Component {...props} onClick={() => setOpen(true)}>
      {children}
    </Component>
  );
};

export type CloseProps = React.ComponentProps<"button"> & AsChild;
export const DialogClose = ({ children, asChild, ...props }: CloseProps) => {
  const { setOpen } = useDialogContext();
  const Component = asChild ? Slot : "button";
  return (
    <Component {...props} onClick={() => setOpen(false)}>
      {children}
    </Component>
  );
};
