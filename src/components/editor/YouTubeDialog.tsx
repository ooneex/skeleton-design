import type { Editor } from "@tiptap/core";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button/Button";
import { createDialog } from "@/components/dialog/Dialog";
import { DialogDescription } from "@/components/dialog/DialogDescription";
import { DialogFooter } from "@/components/dialog/DialogFooter";
import { DialogHeader } from "@/components/dialog/DialogHeader";
import { DialogTitle } from "@/components/dialog/DialogTitle";
import { Input } from "@/components/input/Input";

type YouTubeDialogPropsType = {
  editor: Editor;
};

/**
 * Imperative "embed YouTube video" dialog. Mount `<YouTubeDialog />` once inside
 * the editor, then trigger it with {@link openYouTubeDialog}. Resolves when
 * closed (the embed is applied to the editor as a side effect).
 */
export const YouTubeDialog = createDialog<YouTubeDialogPropsType, void>(
  ({ call, editor }) => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      requestAnimationFrame(() => inputRef.current?.focus());
    }, []);

    const handleSubmit = () => {
      if (!url.startsWith("https://www.youtube.com/") && !url.startsWith("https://youtu.be/")) {
        setError("Please enter a valid YouTube URL");
        return;
      }
      editor.chain().focus().setYoutubeVideo({ src: url, width: 320, height: 180 }).run();
      call.end();
    };

    return (
      <>
        <DialogHeader>
          <DialogTitle>Embed YouTube Video</DialogTitle>
          <DialogDescription>Enter the URL of the YouTube video you want to embed.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            ref={inputRef}
            placeholder="https://www.youtube.com/watch?v=..."
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
          <Button variant="outline" onClick={() => call.end()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Embed</Button>
        </DialogFooter>
      </>
    );
  },
  { className: "ring ring-border p-4", showCloseButton: false },
);
YouTubeDialog.displayName = "YouTubeDialog";

/** Open the YouTube embed dialog for the given editor. */
export const openYouTubeDialog = (editor: Editor) => YouTubeDialog.call({ editor });
