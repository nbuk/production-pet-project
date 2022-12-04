import { memo } from "react";
import { EditableProfileCard } from "features/editableProfileCard";
import { ProfilePageHeader } from "../ProfilePageHeader/ProfilePageHeader";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/ui/Page";

const ProfilePage = memo(() => {
  const { id = "1" } = useParams();

  if (!id) {
    return null;
  }

  return (
    <Page>
      <ProfilePageHeader />
      <EditableProfileCard profileId={id} />
    </Page>
  );
});

export default ProfilePage;
