export type { Profile, ProfileSchema } from "./model/types/profile";
export { profileSlice, profileReducer } from "./model/slice/profileSlice";
export { fetchProfileData } from "./model/services/fetchProfileData/fetchProfileData";
export { ProfileCard } from "./ui/ProfileCard/ProfileCard";

// export { getProfileError } from "./model/selectors/getProfileError/getProfileError";
// export { getProfileIsLoading } from "./model/selectors/getProfileIsLoading/getProfileIsLoading";
// export { getProfileFirstname } from "./model/selectors/getProfileFirstname/getProfileFirstname";
// export { getProfileData } from "./model/selectors/getProfileData/getProfileData";
