import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/ui/Page";

const AboutPage = memo(() => {
  const { t } = useTranslation("about");

  return <Page>{t("О нас")}</Page>;
});

export default AboutPage;
