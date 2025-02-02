"use client";

import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const TOGGLE_AMOUNT_VISIBILITY_EVENT = "amount_visibility_event";

export function AmountVisibilityTrigger() {
  const { visible, toggleVisible } = useAmountVisibility();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7"
      onClick={toggleVisible}
    >
      {visible ? <EyeIcon /> : <EyeClosedIcon />}
    </Button>
  );
}

export function useAmountVisibility() {
  const [visible, setVisible] = useState(true);

  const toggleVisible = useCallback(() => {
    window.dispatchEvent(new Event(TOGGLE_AMOUNT_VISIBILITY_EVENT));
  }, []);

  useEffect(() => {
    const toggleVisibility = () => setVisible((visible) => !visible);
    window.addEventListener(TOGGLE_AMOUNT_VISIBILITY_EVENT, toggleVisibility);
    return () =>
      window.removeEventListener(
        TOGGLE_AMOUNT_VISIBILITY_EVENT,
        toggleVisibility,
      );
  }, []);

  return { visible, toggleVisible };
}
