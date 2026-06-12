import type { Editor } from "@tiptap/react";
import { useState } from "react";
import { LinkIcon } from "@/icons/outline/editing/sm/LinkIcon";
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { Popover } from "@/components/popover/Popover";
import { PopoverContent } from "@/components/popover/PopoverContent";
import { PopoverTrigger } from "@/components/popover/PopoverTrigger";
import { Toggle } from "@/components/toggle/Toggle";

type LinkPropsType = {
  editor: Editor;
  pressed?: boolean;
};

export const Link = ({ editor, pressed }: LinkPropsType) => {
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);

  const isLinkActive = pressed ?? editor?.isActive("link");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Toggle pressed={isLinkActive}>
            <LinkIcon className="size-4" />
          </Toggle>
        }
      />
      <PopoverContent align="start" className="min-w-xs">
        <Input
          placeholder="https://www.google.com"
          onChange={(e) => {
            setLink(e.target.value);
          }}
          defaultValue={editor?.getAttributes("link")?.href}
        />
        <span className="flex items-center gap-2 justify-end">
          {isLinkActive ? (
            <Button
              size="xs"
              variant="destructive"
              onClick={() => {
                editor?.chain().focus().unsetLink().run();
                setLink("");
                setOpen(false);
              }}
            >
              Remove
            </Button>
          ) : null}
          <Button
            size="xs"
            onClick={() => {
              if (!link.startsWith("http://") && !link.startsWith("https://")) {
                return;
              }

              editor?.chain().focus().setLink({ href: link, target: "_blank" }).run();
              setLink("");
              setOpen(false);
            }}
          >
            Add
          </Button>
        </span>
      </PopoverContent>
    </Popover>
  );
};
