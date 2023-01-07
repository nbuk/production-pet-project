import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text } from "@/shared/ui/Text";
import styles from "@/pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.module.scss";
import { TextSize } from "@/shared/ui/Text/Text";
import { ArticleList, ArticleView } from "@/entities/Article";
import { VStack } from "@/shared/ui/Stack";
import { useArticleRecommendationsList } from "../../api/articleRecommendationsApi";

interface ArticlesRecommendationsListProps {
  className?: string;
}

export const ArticlesRecommendationsList = memo((props: ArticlesRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation("article");
  const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

  if (isLoading || error) {
    return null;
  }

  return (
        <VStack gap={16} className={classNames("", {}, [className])}>
            <Text
              size={TextSize.L}
              titleTag={"h3"}
              title={t("Рекомендуем")}
            />
            <ArticleList
              className={styles.recommendations}
              articles={articles}
              isLoading={isLoading}
              view={ArticleView.PLATE}
              target={"_blank"}
            />
        </VStack>
  );
});
