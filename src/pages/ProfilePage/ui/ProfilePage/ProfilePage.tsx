import { memo } from "react";
import { EditableProfileCard } from "features/EditableProfileCard";
import { ProfilePageHeader } from "pages/ProfilePage/ui/ProfilePageHeader/ProfilePageHeader";

const ProfilePage = memo(() => {
  return (
    <div>
      <ProfilePageHeader />
      <EditableProfileCard />
    </div>
  );
});

export default ProfilePage;
