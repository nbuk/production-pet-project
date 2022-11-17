import { memo } from "react";
import { EditableProfileCard } from "features/editableProfileCard";
import { ProfilePageHeader } from "pages/ProfilePage/ui/ProfilePageHeader/ProfilePageHeader";
import { useParams } from "react-router-dom";

const ProfilePage = memo(() => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return (
    <div>
      <ProfilePageHeader />
      <EditableProfileCard profileId={id} />
    </div>
  );
});

export default ProfilePage;
