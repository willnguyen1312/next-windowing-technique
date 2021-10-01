import React, { useEffect } from "react";
import { identity } from "lodash-es";

export function useIntersectionObserver({
  root,
  target,
  onIntersect = identity,
  threshold = 1.0,
  rootMargin = "0px",
  enabled = true,
}: {
  root?: React.RefObject<HTMLButtonElement>;
  target?: React.RefObject<HTMLButtonElement>;
  onIntersect?: () => void;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, enabled]);
}
