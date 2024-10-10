"use client";

import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import Loading from "../loading";
import ErrorCard from "@/app/_components/ErrorCard";
import { TbMoodConfuzed } from "react-icons/tb";
import { FormProvider, useForm } from "react-hook-form";
import { UserData } from "@/app/_interface/userData";
import MainView from "./MainView";

const SettingsPage = () => {
  const [fetchedUserData, loaded] = useLiveQuery(
    async () => {
      const userDatas = await db.userData.toArray();

      return [userDatas[0], true];
    },
    [], // deps...
    [] // default result: makes 'loaded' undefined while loading
  );

  const methods = useForm<UserData>({
    values: fetchedUserData,
    mode: "onTouched",
  });

  if (!loaded) {
    return <Loading />;
  } else if (fetchedUserData === undefined) {
    return (
      <ErrorCard
        title="No user account found"
        description="You need to create a user account to access the associated settings.
        Look for the profile icon on the top-right corner of the screen to create one."
        icon={TbMoodConfuzed}
        iconColor="gray.400"
      />
    );
  } else
    return (
      <FormProvider {...methods}>
        <MainView />
      </FormProvider>
    );
};

export default SettingsPage;
