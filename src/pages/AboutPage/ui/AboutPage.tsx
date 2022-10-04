import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface AboutPageProps {
  className?: string
}

const AboutPage: FC<PropsWithChildren<AboutPageProps>> = () => {
  const { t } = useTranslation("about");

  return <div>{t("О нас")}</div>;
};

export default AboutPage;
