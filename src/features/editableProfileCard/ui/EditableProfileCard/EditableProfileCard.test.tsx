import { EditableProfileCard } from "./EditableProfileCard";
import { componentRender } from "shared/lib/tests/componentRender/componentRender";
import { Profile } from "entities/Profile";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { profileReducer } from "../../model/slice/profileSlice";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { $api } from "shared/api/api";

const profile: Profile = {
  id: "1",
  firstname: "admin",
  lastname: "admin",
  age: 12,
  currency: Currency.EUR,
  country: Country.Russia,
  city: "Moscow",
  username: "admin",
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: "1",
        username: "admin",
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe("features/EditableProfileCard", () => {
  test("switch readonly", async() => {
    componentRender(<EditableProfileCard profileId={"1"} />, options);

    await userEvent.click(screen.getByTestId("EditableProfileCard.EditButton"));

    expect(screen.getByTestId("EditableProfileCard.CancelButton")).toBeInTheDocument();
  });

  test("when click on cancel button the values bare reset", async() => {
    componentRender(<EditableProfileCard profileId={"1"} />, options);

    await userEvent.click(screen.getByTestId("EditableProfileCard.EditButton"));

    await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));
    await userEvent.clear(screen.getByTestId("ProfileCard.lastname"));

    await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");
    await userEvent.type(screen.getByTestId("ProfileCard.lastname"), "user");

    expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("user");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("user");

    await userEvent.click(screen.getByTestId("EditableProfileCard.CancelButton"));

    expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("admin");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("admin");
  });

  test("render error", async() => {
    componentRender(<EditableProfileCard profileId={"1"} />, options);

    await userEvent.click(screen.getByTestId("EditableProfileCard.EditButton"));

    await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));

    await userEvent.click(screen.getByTestId("EditableProfileCard.SaveButton"));

    expect(screen.getByTestId("EditableProfileCard.Error.Paragraph")).toBeInTheDocument();
  });

  test("should be sent PUT request if no errors", async() => {
    componentRender(<EditableProfileCard profileId={"1"} />, options);
    const mockPutReq = jest.spyOn($api, "put");
    await userEvent.click(screen.getByTestId("EditableProfileCard.EditButton"));

    await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");

    await userEvent.click(screen.getByTestId("EditableProfileCard.SaveButton"));

    expect(mockPutReq).toHaveBeenCalled();
  });
});
