import { memo, useCallback, useMemo } from "react";
import { useDrawerContentRef } from "@/components/drawer";
import { Select } from "@/components/select/Select";
import { cn } from "@/utils/cn";
import { statusBadgeMap } from "./statusBadgeMap";

export type StatusType = (typeof statusBadgeMap)[number]["status"];

export type StatusPickerPropsType = {
  value?: StatusType;
  onChange?: (value: StatusType) => void;
  disabled?: boolean;
  className?: string;
};

const statusBadgeComponents = Object.fromEntries(
  statusBadgeMap.map(({ status, component }) => [status, component]),
) as Record<StatusType, React.ComponentType>;

export const StatusPicker = memo(({ value = "draft", onChange, disabled, className }: StatusPickerPropsType) => {
  const drawerContentRef = useDrawerContentRef();

  const handleChange = useCallback(
    (newValue: string | null) => {
      if (newValue) {
        onChange?.(newValue as StatusType);
      }
    },
    [onChange],
  );

  const SelectedBadge = useMemo(() => statusBadgeComponents[value], [value]);

  return (
    <Select disabled={disabled} onValueChange={handleChange} value={value}>
      <Select.Trigger size="sm" className="w-full cursor-pointer items-center">
        <Select.Value placeholder="Select status">
          <SelectedBadge />
        </Select.Value>
      </Select.Trigger>
      <Select.Content className={cn("max-h-52", className)} alignItemWithTrigger={false} container={drawerContentRef}>
        {statusBadgeMap.map(({ status, component: BadgeComponent }) => (
          <Select.Item key={status} value={status}>
            <BadgeComponent />
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
});
