import { FC, Suspense } from "react";
import { AppRouter } from "app/providers/router";
import { classNames } from "shared/lib/classNames/classNames";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";

export const App: FC = () => {
  return (
    <div className={classNames("app", {}, [])}>
      <Suspense fallback="">
        <Navbar />
        <div className={"content-page"}>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};
