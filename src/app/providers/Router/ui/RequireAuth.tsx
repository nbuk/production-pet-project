import { FC, ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData, getUserRoles } from "entities/User";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { UserRole } from "entities/User/model/types/user";

interface RequireAuthProps {
  children: ReactNode;
  roles?: UserRole[];
}

export const RequireAuth: FC<RequireAuthProps> = (props) => {
  const { children, roles } = props;
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) return true;

    return roles.some((role) => {
      return userRoles?.includes(role);
    });
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} />;
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} />;
  }

  return (
    <>
      {children}
    </>
  );
};
