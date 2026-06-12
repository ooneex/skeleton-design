import type { Editor } from "@tiptap/core";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button/Button";
import { Dialog } from "@/components/dialog/Dialog";
import { DialogContent } from "@/components/dialog/DialogContent";
import { DialogDescription } from "@/components/dialog/DialogDescription";
import { DialogFooter } from "@/components/dialog/DialogFooter";
import { DialogHeader } from "@/components/dialog/DialogHeader";
import { DialogTitle } from "@/components/dialog/DialogTitle";
import { Input } from "@/components/input/Input";

type YouTubeDialogStateType = {
  open: boolean;
  editor: Editor | null;
};

let youtubeDialogState: YouTubeDialogStateType = {
  open: false,
  editor: null,
};

const youtubeDialogListeners: Set<() => void> = new Set();

export const setYouTubeDialogState = (state: Partial<YouTubeDialogStateType>) => {
  youtubeDialogState = { ...youtubeDialogState, ...state };
  for (const listener of youtubeDialogListeners) {
    listener();
  }
};

const useYouTubeDialogState = () => {
  const [state, setState] = useState(youtubeDialogState);

  useEffect(() => {
    const listener = () => setState({ ...youtubeDialogState });
    youtubeDialogListeners.add(listener);
    return () => {
      youtubeDialogListeners.delete(listener);
    };
  }, []);

  return state;
};

export const YouTubeDialog = () => {
  const { open, editor } = useYouTubeDialogState();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  const handleClose = () => {
    setYouTubeDialogState({ open: false, editor: null });
    setUrl("");
    setError("");
  };

  const handleSubmit = () => {
    if (!url.startsWith("https://www.youtube.com/") && !url.startsWith("https://youtu.be/")) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    if (editor) {
      editor.chain().focus().setYoutubeVideo({ src: url, width: 320, height: 180 }).run();
    }

    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="ring ring-border p-4">
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
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Embed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
