import { memo, PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { useParams } from "react-router-dom";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: PropsWithChildren<ArticleEditPageProps>) => {
  const { className } = props;
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string; }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames("", {}, [className])}>
      {isEdit ? t("Редактирование статьи") : t("Создание новой статьи")}
    </Page>
  );
});

export default ArticleEditPage;
