import { memo, PropsWithChildren } from "react";
import { classNames } from "shared/lib/classNames";
import styles from "./ArticleDetailsPage.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import { Text } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsCommentReducer, getArticleComments } from "../../model/slice/articleDetailsCommentSlice";
import { useSelector } from "react-redux";
import { getArticleDetailsCommentsIsLoading } from "../../model/selectors/comments";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  fetchCommentsByArticleId,
} from "pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

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
  const { id } = useParams<{ id: string; }>();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  if (!id) {
    return (
      <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text className={styles.commentTitle} title={t("Комментарии")} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  );
});

export default memo(ArticleDetailsPage);
