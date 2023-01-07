import { FC, PropsWithChildren, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./ArticleDetailsPageHeader.module.scss";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getArticleDetailsData } from "@/entities/Article";
import { getCanEditArticle } from "../../model/selectors/article";
import { HStack } from "@/shared/ui/Stack";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<PropsWithChildren<ArticleDetailsPageHeaderProps>> = (props) => {
  const { className } = props;
  const { t } = useTranslation("article");
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  const handleBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const handleEditArticle = useCallback(() => {
    navigate(`${RoutePath.articles}/${article ? article.id : 0}/edit`);
  }, [article, navigate]);

  if (!article) return null;

  return (
    <HStack justify={"between"} max className={classNames("", {}, [className])}>
      <Button theme={ButtonTheme.OUTLINE} onClick={handleBackToList}>
        {t("Назад к списку")}
      </Button>
      { canEdit &&
        <Button
          className={styles.editBtn}
          theme={ButtonTheme.OUTLINE}
          onClick={handleEditArticle}
        >
          {t("Редактировать")}
        </Button>
      }

    </HStack>
  );
};
