import { UserData } from "@/app/_interface/userData";
import {
  Button,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import UserProfileEditor from "./UserProfileEditor";
import UserPreferenceEditor from "./UserPreferenceEditor";
import UserSavedTests from "./UserSavedTests";

const MainView = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isValid },
  } = useFormContext<UserData>();

  return (
    <div>
      <Heading>Settings</Heading>

      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Preferences</Tab>
          <Tab>Saved Tests</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <UserProfileEditor />
          </TabPanel>
          <TabPanel>
            <UserPreferenceEditor />
          </TabPanel>
          <TabPanel>
            <UserSavedTests />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MainView;
