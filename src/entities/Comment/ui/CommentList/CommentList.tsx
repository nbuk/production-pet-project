import { memo, PropsWithChildren } from "react";
import { Comment } from "../../model/types/comment";
import { useTranslation } from "react-i18next";
import { Text } from "@/shared/ui/Text/Text";
import { CommentCard } from "../CommentCard/CommentCard";
import { VStack } from "@/shared/ui/Stack";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: PropsWithChildren<CommentListProps>) => {
  const { comments, isLoading } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap={16} max>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap={16} max>
      {comments?.length
        ? (
            comments.map((comment) => (
              <CommentCard key={comment.id} isLoading={isLoading} comment={comment} />
            ))
          )
        : (
            <Text text={t("Комментарии отсутствуют")} />
          )}
    </VStack>
  );
});
