import type { Editor } from "@tiptap/core";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button/Button";
import { createDialog } from "@/components/dialog/Dialog";
import { DialogDescription } from "@/components/dialog/DialogDescription";
import { DialogFooter } from "@/components/dialog/DialogFooter";
import { DialogHeader } from "@/components/dialog/DialogHeader";
import { DialogTitle } from "@/components/dialog/DialogTitle";
import { Input } from "@/components/input/Input";

type LinkDialogPropsType = {
  editor: Editor;
};

/**
 * Imperative "add link" dialog. Mount `<LinkDialog />` once inside the editor,
 * then trigger it with {@link openLinkDialog}. Resolves when closed (the link
 * is applied to or removed from the editor as a side effect).
 */
export const LinkDialog = createDialog<LinkDialogPropsType, void>(
  ({ call, editor }) => {
    const [url, setUrl] = useState<string>(editor.getAttributes("link").href ?? "");
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const isLinkActive = editor.isActive("link");

    useEffect(() => {
      requestAnimationFrame(() => inputRef.current?.focus());
    }, []);

    const handleSubmit = () => {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        setError("Please enter a valid URL");
        return;
      }
      editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
      call.end();
    };

    return (
      <>
        <DialogHeader>
          <DialogTitle>{isLinkActive ? "Edit Link" : "Add Link"}</DialogTitle>
          <DialogDescription>Enter the URL you want to link to.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            ref={inputRef}
            placeholder="https://www.google.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          {isLinkActive ? (
            <Button
              variant="destructive"
              className="mr-auto"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                call.end();
              }}
            >
              Remove
            </Button>
          ) : null}
          <Button variant="outline" onClick={() => call.end()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{isLinkActive ? "Save" : "Add"}</Button>
        </DialogFooter>
      </>
    );
  },
  { className: "ring ring-border p-4", showCloseButton: false },
);
LinkDialog.displayName = "LinkDialog";

/** Open the link dialog for the given editor. */
export const openLinkDialog = (editor: Editor) => LinkDialog.call({ editor });
