import { UserData } from "@/app/_interface/userData";
import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import UserProfileEditor from "./UserProfileEditor";
import UserPreferenceEditor from "./UserPreferenceEditor";
import UserSavedTests from "./UserSavedTests";
import {
  TbDeviceFloppy,
  TbTrack,
  TbTransferOut,
  TbTrash,
  TbUpload,
} from "react-icons/tb";
import { db } from "@/db/db";
import useDelete from "@/lib/useDelete";
import useExport from "@/lib/useExport";

const MainView = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isValid },
  } = useFormContext<UserData>();

  const onSubmitUserDataEdit: SubmitHandler<UserData> = async (
    data: UserData
  ) => {
    await db.userData.put(data);
  };

  const { exportUserData } = useExport();
  const { deleteUserData } = useDelete();

  return (
    <div>
      <title>Settings - OpenMock</title>
      <Flex>
        <Heading>Settings</Heading>

        <ButtonGroup variant={"outline"} ml={"auto"}>
          <Button
            colorScheme={"blue"}
            leftIcon={<TbTransferOut />}
            onClick={() => exportUserData()}
          >
            Export
          </Button>
          <Button
            colorScheme={"red"}
            leftIcon={<TbTrash />}
            onClick={() => deleteUserData("/home")}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Flex>

      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Preferences</Tab>
          <Tab>Saved Tests</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <UserProfileEditor />
            <Button
              mt={2}
              colorScheme={"green"}
              leftIcon={<TbDeviceFloppy />}
              onClick={handleSubmit(onSubmitUserDataEdit)}
            >
              Save
            </Button>
          </TabPanel>
          <TabPanel>
            <UserPreferenceEditor />
            <Button
              mt={2}
              colorScheme={"green"}
              leftIcon={<TbDeviceFloppy />}
              onClick={handleSubmit(onSubmitUserDataEdit)}
            >
              Save
            </Button>
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
