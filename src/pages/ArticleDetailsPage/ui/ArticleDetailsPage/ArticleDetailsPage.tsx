import { memo, PropsWithChildren, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleDetailsPage.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleDetails, ArticleList, ArticleView } from "entities/Article";
import { useParams } from "react-router-dom";
import { Text, TextSize } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { getArticleComments } from "../../model/slice/articleDetailsCommentSlice";
import { useSelector } from "react-redux";
import { getArticleDetailsCommentsIsLoading } from "../../model/selectors/comments";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import AddCommentForm from "features/addCommentForm/ui/AddCommentForm/AddCommentForm";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { Page } from "widgets/Page/ui/Page";
import { getArticleRecommendations } from "../../model/slice/articleDetailsRecomendations";
import { getArticleDetailsRecommendationsIsLoading } from "../../model/selectors/recommendations";
import { fetchRecommendations } from "../../model/services/fetchRecommendations/fetchRecommendations";
import { articleDetailsPageReducer } from "../../model/slice";
import { ArticleDetailsPageHeader } from "pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader";

const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = memo((props: PropsWithChildren<ArticleDetailsPageProps>) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation("article");
  const { id = "1" } = useParams<{ id: string; }>();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleDetailsRecommendationsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchRecommendations());
  });

  const handleSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  if (!id) {
    return (
      <Page className={classNames(styles.ArticleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(styles.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id}/>
        <Text
          className={styles.commentTitle}
          size={TextSize.L}
          title={t("Рекомендуем")}
        />
        <ArticleList
          className={styles.recommendations}
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          view={ArticleView.PLATE}
          target={"_blank"}
        />
        <Text
          className={styles.commentTitle}
          size={TextSize.L}
          title={t("Комментарии")}
        />
        <AddCommentForm onSendComment={handleSendComment}/>
        <CommentList isLoading={commentsIsLoading} comments={comments}/>
      </Page>
    </DynamicModuleLoader>
  );
});

export default memo(ArticleDetailsPage);
