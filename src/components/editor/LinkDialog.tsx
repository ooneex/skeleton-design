import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button/Button";
import { createDialog } from "@/components/dialog/Dialog";
import { DialogDescription } from "@/components/dialog/DialogDescription";
import { DialogFooter } from "@/components/dialog/DialogFooter";
import { DialogHeader } from "@/components/dialog/DialogHeader";
import { DialogTitle } from "@/components/dialog/DialogTitle";
import { Input } from "@/components/input/Input";

type LinkDialogPropsType = {
  initialHref: string;
  isActive: boolean;
};

/** The link chosen in the dialog: apply an href, remove the link, or cancel. */
export type LinkDialogResultType = { href: string } | { remove: true } | null;

/**
 * Imperative "add/edit link" dialog. Mount `<LinkDialog />` once, then open it
 * with {@link openLinkDialog}. Resolves with the chosen action so the caller can
 * apply it to the editor after restoring the text selection.
 */
export const LinkDialog = createDialog<LinkDialogPropsType, LinkDialogResultType>(
  ({ call, initialHref, isActive }) => {
    const [url, setUrl] = useState(initialHref);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      requestAnimationFrame(() => inputRef.current?.focus());
    }, []);

    const handleSubmit = () => {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        setError("Please enter a valid URL");
        return;
      }
      call.end({ href: url });
    };

    return (
      <>
        <DialogHeader>
          <DialogTitle>{isActive ? "Edit Link" : "Add Link"}</DialogTitle>
          <DialogDescription>Enter the URL you want to link to.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            ref={inputRef}
            placeholder="https://www.google.com"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              setError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
        <DialogFooter>
          {isActive ? (
            <Button variant="destructive" className="mr-auto" onClick={() => call.end({ remove: true })}>
              Remove
            </Button>
          ) : null}
          <Button variant="outline" onClick={() => call.end(null)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{isActive ? "Save" : "Add"}</Button>
        </DialogFooter>
      </>
    );
  },
  { className: "ring ring-border p-4", showCloseButton: false, dismissValue: null },
);
LinkDialog.displayName = "LinkDialog";

/** Open the link dialog and resolve with the chosen action. */
export const openLinkDialog = (props: LinkDialogPropsType) => LinkDialog.call(props);
