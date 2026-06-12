import type { Editor } from "@tiptap/react";
import { useState } from "react";
import { VideoIcon as YoutubeIcon } from "@/icons/outline/photography-video/sm/VideoIcon";
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { Popover } from "@/components/popover/Popover";
import { PopoverContent } from "@/components/popover/PopoverContent";
import { PopoverTrigger } from "@/components/popover/PopoverTrigger";
import { cn } from "@/utils/cn";

type YoutubePropsType = {
  editor: Editor;
};

export const Youtube = ({ editor }: YoutubePropsType) => {
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);

  const isYoutubeActive = editor?.isActive("youtube");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "h-8 min-w-8 px-1.5 flex items-center justify-center rounded cursor-pointer",
          "hover:bg-muted",
          isYoutubeActive ? "bg-muted" : "",
        )}
      >
        <YoutubeIcon className="size-6" />
      </PopoverTrigger>
      <PopoverContent align="start" className="min-w-xs">
        <p className="w-full text-center">Copy your YouTube link and paste it here</p>
        <Input
          placeholder="https://www.youtube.com/"
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <span className="flex items-center gap-2 justify-end">
          <Button
            onClick={() => {
              if (!link.startsWith("https://www.youtube.com/")) {
                return;
              }

              editor
                ?.chain()
                .focus()
                .setYoutubeVideo({
                  src: link,
                  width: 320,
                  height: 180,
                })
                .run();
              setLink("");
              setOpen(false);
            }}
          >
            Add video
          </Button>
        </span>
      </PopoverContent>
    </Popover>
  );
};
