import * as React from "react";
import { useDrawerContentRef } from "@/components/drawer/drawerContext";
import { Select } from "@/components/select/Select";
import { SelectContent } from "@/components/select/SelectContent";
import { SelectItem } from "@/components/select/SelectItem";
import { SelectTrigger } from "@/components/select/SelectTrigger";
import { SelectValue } from "@/components/select/SelectValue";

export type TimePickerPropsType = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  minTime?: string;
};

const parseTime = (time: string): { hour: number; minute: number } | null => {
  const match = time.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  return { hour: Number.parseInt(match[1], 10), minute: Number.parseInt(match[2], 10) };
};

export const TimePicker = ({ value, onChange, disabled, minTime }: TimePickerPropsType) => {
  const drawerContentRef = useDrawerContentRef();

  const getDefaultTime = React.useCallback(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    return {
      hour: String(h).padStart(2, "0"),
      minute: String(m).padStart(2, "0"),
    };
  }, []);

  const [hour, setHour] = React.useState<string>("");
  const [minute, setMinute] = React.useState<string>("");

  React.useEffect(() => {
    if (!value) {
      const def = getDefaultTime();
      setHour(def.hour);
      setMinute(def.minute);
      if (onChange) {
        const newValue = `${def.hour}:${def.minute}`;
        onChange(newValue);
      }
    } else if (typeof value === "string" && value.match(/^\d{1,2}:\d{2}$/)) {
      const [h, m] = value.split(":");
      setHour(h.padStart(2, "0"));
      setMinute(m);
    }
  }, [value, onChange, getDefaultTime]);

  const handleChange = React.useCallback(
    (h: string, m: string) => {
      setHour(h);
      setMinute(m);
      if (h && m && onChange) {
        const newValue = `${h}:${m}`;
        if (newValue !== value) {
          onChange(newValue);
        }
      }
    },
    [onChange, value],
  );

  const minTimeParsed = minTime ? parseTime(minTime) : null;

  const availableHours = React.useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
    if (!minTimeParsed) return hours;
    return hours.filter((h) => Number.parseInt(h, 10) >= minTimeParsed.hour);
  }, [minTimeParsed]);

  const availableMinutes = React.useMemo(() => {
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
    if (!minTimeParsed) return minutes;
    const currentHour = Number.parseInt(hour, 10);
    if (currentHour > minTimeParsed.hour) return minutes;
    if (currentHour === minTimeParsed.hour) {
      return minutes.filter((m) => Number.parseInt(m, 10) > minTimeParsed.minute);
    }
    return minutes;
  }, [minTimeParsed, hour]);

  // Auto-adjust hour when it becomes invalid due to minTime change
  React.useEffect(() => {
    if (availableHours.length > 0 && hour && !availableHours.includes(hour)) {
      const firstAvailable = availableHours[0];
      if (firstAvailable) {
        handleChange(firstAvailable, minute);
      }
    }
  }, [availableHours, hour, minute, handleChange]);

  // Auto-adjust minute when it becomes invalid due to hour change or minTime change
  React.useEffect(() => {
    if (availableMinutes.length > 0 && minute && !availableMinutes.includes(minute)) {
      const firstAvailable = availableMinutes[0];
      if (firstAvailable) {
        handleChange(hour, firstAvailable);
      }
    }
  }, [availableMinutes, minute, hour, handleChange]);

  return (
    <div className="flex w-full items-center gap-2 justify-start">
      <div className="w-16">
        <Select
          disabled={disabled}
          onValueChange={React.useCallback(
            (val: string | null) => {
              if (val) handleChange(val, minute);
            },
            [minute, handleChange],
          )}
          value={hour}
        >
          <SelectTrigger size="sm" className="w-full cursor-pointer">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent className="max-h-64" alignItemWithTrigger={false} container={drawerContentRef}>
            {availableHours.map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <span className="px-1">:</span>
      <div className="w-16">
        <Select
          disabled={disabled}
          onValueChange={React.useCallback(
            (val: string | null) => {
              if (val) handleChange(hour, val);
            },
            [hour, handleChange],
          )}
          value={minute}
        >
          <SelectTrigger size="sm" className="w-full cursor-pointer">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent className="max-h-64" alignItemWithTrigger={false} container={drawerContentRef}>
            {availableMinutes.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
