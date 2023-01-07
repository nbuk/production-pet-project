import { HTMLAttributeAnchorTarget, memo, PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./ArticleListItem.module.scss";
import { useTranslation } from "react-i18next";
import { Article, ArticleBlockType, ArticleTextBlock, ArticleView } from "../../model/types/article";
import { Text, TextTheme } from "@/shared/ui/Text/Text";
import { Icon } from "@/shared/ui/Icon/Icon";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import { Card } from "@/shared/ui/Card";
import { Avatar } from "@/shared/ui/Avatar";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { AppLink } from "@/shared/ui/AppLink";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: PropsWithChildren<ArticleListItemProps>) => {
  const {
    className,
    article,
    view,
    target,
  } = props;
  const { t } = useTranslation("article");

  const types = <Text className={styles.types} text={article.type.join(", ")} />;
  const views = (
    <>
      <Text className={styles.views} text={String(article.views)} />
      <Icon className={styles.icon} Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    return (
      <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
        <Card className={styles.card}>
          <div className={styles.header}>
            <Avatar size={30} src={article.user.avatar ?? ""} />
            <Text className={styles.username} text={article.user.username} />
            <Text className={styles.date} text={article.createdAt} />
          </div>
          <Text className={styles.title} title={article.title} />
          {types}
          <img className={styles.image} src={article.img} alt={article.title} />
          {textBlock && <ArticleTextBlockComponent className={styles.textBlock} block={textBlock} />}
          <div className={styles.footer} >
            <AppLink to={RoutePath.article_details + article.id}>
              <Button theme={ButtonTheme.OUTLINE}>
                {t("Читать далее...")}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}
      to={RoutePath.article_details + article.id}
      target={target}
    >
      <Card className={styles.card} >
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={article.img} alt={article.title} />
          <div className={styles.date}>
            <Text text={article.createdAt} theme={TextTheme.INVERTED} />
          </div>
        </div>
        <div className={styles.infoWrapper}>
          {types}
          {views}
        </div>
        <Text className={styles.title} text={article.title} />
      </Card>
    </AppLink>
  );
});
