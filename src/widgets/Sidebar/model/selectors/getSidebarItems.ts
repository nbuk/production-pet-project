import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { SidebarItemType } from "widgets/Sidebar/model/types/sidebarItems";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainIcon from "shared/assets/icons/main.svg";
import AboutIcon from "shared/assets/icons/about.svg";
import ProfileIcon from "shared/assets/icons/profile.svg";
import ArticleIcon from "shared/assets/icons/article.svg";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      text: "Главная",
      Icon: MainIcon,
    },
    {
      path: RoutePath.about,
      text: "О нас",
      Icon: AboutIcon,
    },

  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData.id,
        text: "Профиль",
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        text: "Статьи",
        Icon: ArticleIcon,
        authOnly: true,
      });
  }

  return sidebarItemsList;
});
