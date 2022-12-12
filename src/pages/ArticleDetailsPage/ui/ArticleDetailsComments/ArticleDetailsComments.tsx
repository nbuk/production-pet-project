import { memo, PropsWithChildren, useCallback } from "react";
import { classNames } from "shared/lib/classNames";
import AddCommentForm from "features/addCommentForm/ui/AddCommentForm/AddCommentForm";
import { CommentList } from "entities/Comment";
import { VStack } from "shared/ui/Stack";
import { useSelector } from "react-redux";
import { getArticleComments } from "../../model/slice/articleDetailsCommentSlice";
import { getArticleDetailsCommentsIsLoading } from "../../model/selectors/comments";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text, TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

export const ArticleDetailsComments = memo((props: PropsWithChildren<ArticleDetailsCommentsProps>) => {
  const { className, id } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation("article");

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const handleSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  return (
    <VStack gap={16} max className={classNames("", {}, [className])}>
      <Text
        size={TextSize.L}
        titleTag={"h3"}
        title={t("Комментарии")}
      />
      <AddCommentForm onSendComment={handleSendComment}/>
      <CommentList isLoading={commentsIsLoading} comments={comments}/>
    </VStack>
  );
});
