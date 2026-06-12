import type { ReactNode } from "react";
import { Toaster as Sonner, type ToasterProps, toast } from "sonner";
import { SpinnerLoaderIcon } from "@/icons/outline/loaders/sm/SpinnerLoaderIcon";
import { CircleInfoIcon } from "@/icons/outline/travel/sm/CircleInfoIcon";
import { CircleCheckIcon } from "@/icons/outline/ui-layout/sm/CircleCheckIcon";
import { CircleXmarkIcon } from "@/icons/outline/ui-layout/sm/CircleXmarkIcon";
import { TriangleWarningIcon } from "@/icons/outline/ui-layout/sm/TriangleWarningIcon";
import { XmarkIcon } from "@/icons/outline/ui-layout/sm/XmarkIcon";
import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";

const TOAST_DURATION = 4000;

type ToastStateType = "success" | "error" | "warning" | "info" | "loading";

type ToastOptionsType = {
  description: string;
  duration?: number;
};

const stateStyles: Record<ToastStateType, { badge: string; glow: string }> = {
  success: {
    badge: "bg-success-500",
    glow: "shadow-[0_0_8px_theme(--color-success-500/0.4)]",
  },
  error: {
    badge: "bg-danger-500",
    glow: "shadow-[0_0_8px_theme(--color-danger-500/0.4)]",
  },
  warning: {
    badge: "bg-warning-500",
    glow: "shadow-[0_0_8px_theme(--color-warning-500/0.4)]",
  },
  info: {
    badge: "bg-info-500",
    glow: "shadow-[0_0_8px_theme(--color-info-500/0.4)]",
  },
  loading: {
    badge: "bg-primary-400",
    glow: "shadow-[0_0_8px_theme(--color-primary-400/0.4)]",
  },
};

const stateIcons: Record<ToastStateType, ReactNode> = {
  success: <CircleCheckIcon className="size-3.5 shrink-0" />,
  error: <CircleXmarkIcon className="size-3.5 shrink-0" />,
  warning: <TriangleWarningIcon className="size-3.5 shrink-0" />,
  info: <CircleInfoIcon className="size-3.5 shrink-0" />,
  loading: <SpinnerLoaderIcon className="size-3.5 shrink-0 animate-spin" />,
};

const ToastContent = ({
  id,
  state,
  title,
  description,
  duration,
}: {
  id: string | number;
  state: ToastStateType;
  title: string;
  description: string;
  duration: number;
}) => {
  const styles = stateStyles[state];

  return (
    <div className="relative flex w-91 items-start gap-3 overflow-hidden rounded-lg bg-linear-to-br from-primary-950 via-primary-800 to-primary-950 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.25),0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div
        className={cn(
          "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded text-light",
          styles.badge,
          styles.glow,
        )}
      >
        {stateIcons[state]}
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm font-medium text-light">{title}</p>
        <p className="mt-0.5 text-xs text-light/50">{description}</p>
      </div>
      <Button
        variant="ghost"
        size="icon-xs"
        className="shrink-0 mt-0.5 text-light/25 hover:text-light/70 hover:bg-light/10"
        onClick={() => toast.dismiss(id)}
      >
        <XmarkIcon className="size-3.5" />
      </Button>
      {state !== "loading" && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-light/4">
          <div
            className={cn("h-full", styles.badge)}
            style={{
              animation: `toast-progress ${duration}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  );
};

const show = (state: ToastStateType) => (title: string, options: ToastOptionsType) => {
  const duration = options.duration ?? TOAST_DURATION;
  return toast.custom(
    (id) => <ToastContent id={id} state={state} title={title} description={options.description} duration={duration} />,
    { duration },
  );
};

export const toaster = {
  success: show("success"),
  error: show("error"),
  info: show("info"),
  warning: show("warning"),
  loading: show("loading"),
  dismiss: toast.dismiss,
  promise: toast.promise,
};

export const Toaster = (props: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      className="toaster group"
      expand={false}
      visibleToasts={5}
      style={{ zIndex: 9999 }}
      {...props}
    />
  );
};
