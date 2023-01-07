import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { Avatar } from "@/shared/ui/Avatar";
import { Dropdown } from "@/shared/ui/Popups";
import { useSelector } from "react-redux";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const authData = useSelector(getUserAuthData);

  const isAdminPanelAvailable = isAdmin || isManager;

  const handleLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) return null;

  return (
      <Dropdown
        className={className}
        direction={"bottom-left"}
        items={[
          ...(isAdminPanelAvailable
            ? [{
                content: t("Админка"),
                href: RoutePath.admin_panel,
              }]
            : []),
          {
            content: t("Профиль"),
            href: RoutePath.profile + authData.id,
          },
          {
            content: t("Выйти"),
            onClick: handleLogout,
          },
        ]}
        trigger={<Avatar src={authData.avatar} size={30} />}
      />
  );
});
