import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

export default function useSessionLock(enabled = true) {
  const navigate = useNavigate();
  const resetChat = useAppStore((s) => s.resetChat);
  const disconnectSocket = useAppStore((s) => s.disconnectSocket);

  useEffect(() => {
    if (!enabled) return;

    // ignore any focus/visibility events that fire immediately during mount
    let ignore = true;
    const timer = setTimeout(() => {
      ignore = false;
    }, 500);

    const lock = () => {
      if (ignore) return;
      disconnectSocket();
      resetChat();
      try {
        sessionStorage.clear();
      } catch {}
      navigate("/", { replace: true });
    };

    const onVisibility = () => {
      if (document.visibilityState !== "visible") lock();
    };

    const onBlur = () => {
      lock();
    };

    window.addEventListener("blur", onBlur);
    window.addEventListener("pagehide", lock);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("pagehide", lock);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, navigate, resetChat, disconnectSocket]);
}