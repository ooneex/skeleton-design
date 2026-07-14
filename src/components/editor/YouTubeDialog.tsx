import { getId } from "@ooneex/youtube-utils";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button/Button";
import { createDialog } from "@/components/dialog/Dialog";
import { DialogDescription } from "@/components/dialog/DialogDescription";
import { DialogFooter } from "@/components/dialog/DialogFooter";
import { DialogHeader } from "@/components/dialog/DialogHeader";
import { DialogTitle } from "@/components/dialog/DialogTitle";
import { Input } from "@/components/input/Input";

/**
 * Imperative "embed YouTube video" dialog. Mount `<YouTubeDialog />` once, then
 * open it with {@link openYouTubeDialog}. Resolves with the entered URL, or
 * `null` when dismissed.
 */
export const YouTubeDialog = createDialog<void, string | null>(
  ({ call }) => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      requestAnimationFrame(() => inputRef.current?.focus());
    }, []);

    const handleSubmit = () => {
      if (!getId(url)) {
        setError("Please enter a valid YouTube URL");
        return;
      }
      call.end(url);
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
          <Button variant="outline" onClick={() => call.end(null)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Embed</Button>
        </DialogFooter>
      </>
    );
  },
  { className: "ring ring-border p-4", showCloseButton: false, dismissValue: null },
);
YouTubeDialog.displayName = "YouTubeDialog";

/** Open the YouTube embed dialog and resolve with the entered URL (or `null`). */
export const openYouTubeDialog = () => YouTubeDialog.call();
