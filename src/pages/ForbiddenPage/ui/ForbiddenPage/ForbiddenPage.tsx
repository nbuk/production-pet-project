import { memo, PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";

interface AdminPanelPageProps {
  className?: string;
}

const ForbiddenPage = memo((props: PropsWithChildren<AdminPanelPageProps>) => {
  const { className } = props;
  const { t } = useTranslation("forbidden");

  return (
    <Page className={classNames("", {}, [className])}>
      {t("Доступ запрещен")}
    </Page>
  );
});

export default ForbiddenPage;
