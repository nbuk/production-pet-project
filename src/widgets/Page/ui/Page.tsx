import { memo, PropsWithChildren, UIEvent, useRef } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./Page.module.scss";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { scrollPositionActions } from "../model/slices/scrollPositionSlices";
import { useLocation } from "react-router-dom";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useSelector } from "react-redux";
import { getScrollPositionByPath } from "../model/selectors/getScrollPosition";
import { StateSchema } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle";

interface PageProps {
  className?: string;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PropsWithChildren<PageProps>) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getScrollPositionByPath(state, pathname));

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = scrollPosition;
    }
  });

  const handleScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(scrollPositionActions.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: pathname,
    }));
  }, 500);

  return (
    <section
      ref={wrapperRef}
      className={classNames(styles.Page, {}, [className])}
      onScroll={handleScroll}
    >
      {children}
      { onScrollEnd && <div className={styles.trigger} ref={triggerRef} />}
    </section>
  );
});
