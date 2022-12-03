import { memo, PropsWithChildren, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleDetailsPage.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleDetails } from "entities/Article";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsCommentReducer, getArticleComments } from "../../model/slice/articleDetailsCommentSlice";
import { useSelector } from "react-redux";
import { getArticleDetailsCommentsIsLoading } from "../../model/selectors/comments";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import AddCommentForm from "features/addCommentForm/ui/AddCommentForm/AddCommentForm";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { Button, ButtonTheme } from "shared/ui/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Page } from "widgets/Page/ui/Page";

const reducers: ReducerList = {
  articleDetailsComments: articleDetailsCommentReducer,
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
  const navigate = useNavigate();

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const handleSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  const handleBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

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
        <Button theme={ButtonTheme.OUTLINE} onClick={handleBackToList}>
          {t("Назад к списку")}
        </Button>
        <ArticleDetails id={id} />
        <Text className={styles.commentTitle} title={t("Комментарии")} />
        <AddCommentForm onSendComment={handleSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  );
});

export default memo(ArticleDetailsPage);
