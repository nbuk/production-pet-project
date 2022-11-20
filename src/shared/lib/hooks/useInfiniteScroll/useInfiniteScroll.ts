import { RefObject, useEffect } from "react";

interface UseInfiniteScrollProps {
  callback?: () => void;
  triggerRef: RefObject<HTMLElement>;
  wrapperRef: RefObject<HTMLElement>;
}

export function useInfiniteScroll({ callback, wrapperRef, triggerRef }: UseInfiniteScrollProps) {
  useEffect(() => {
    if (!triggerRef.current || !callback) return;

    const triggerElement = triggerRef.current;
    const options = {
      root: wrapperRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(triggerElement);

    return () => {
      if (observer) {
        observer.unobserve(triggerElement);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
}
