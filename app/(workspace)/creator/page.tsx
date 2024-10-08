"use client";

import React, { useState } from "react";
import MainView from "./MainView";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";
import { emptyTestPaper } from "@/app/(test)/test/empty";
import { testDraftGenerator } from "@/app/_functions/testDraftGenerator";
import { Action } from "@/app/_functions/userCacheReducer";
import { TestPaper } from "@/app/_interface/testData";
import Loading from "../loading";
import testDraftReducer, {
  INITIALIZE_STATE,
} from "@/app/_functions/testDraftReducer";
import { FormProvider, useForm } from "react-hook-form";
import { DialogDataContext } from "@/app/(test)/test/page";
import ConfirmationModal from "@/app/(test)/test/_modals/ConfirmationModal";

import systemData from "../../../public/systemData.json";

export const DraftStateContext = React.createContext(emptyTestPaper);

export const DraftDispatchContext = React.createContext(function example(
  action: Action
) {});

const CreatorPage = () => {
  const [state, dispatch] = React.useReducer(testDraftReducer, emptyTestPaper);

  const dialogData = useState({
    active: false,
    title: "",
    message: "",
  });

  const [fetchedTestPaper, loaded]: [Partial<TestPaper>, boolean] | [] =
    useLiveQuery(
      async () => {
        const [userData] = await db.userData.toArray();
        const [activeTestDraft] = await db.activeTestDraft.toArray();

        const finalTestDraft =
          activeTestDraft ?? testDraftGenerator(userData, systemData);
        dispatch({ type: INITIALIZE_STATE, payload: finalTestDraft });

        return [finalTestDraft, true];
      },
      // db.activeTestDraft.toArray().then((response) => {
      //   const finalResponse =
      //     response[0] ?? testDraftGenerator(Date.now(), "0");
      //   dispatch({ type: INITIALIZE_STATE, payload: finalResponse });
      //   return [finalResponse, true];
      // }),
      [],
      []
    );

  const methods = useForm<Partial<TestPaper>>({
    values: fetchedTestPaper,
    mode: "onTouched",
  });

  if (!loaded) {
    return <Loading />;
  }
  return (
    <DraftStateContext.Provider value={state}>
      <DraftDispatchContext.Provider value={dispatch}>
        <DialogDataContext.Provider value={dialogData}>
          <FormProvider {...methods}>
            <ConfirmationModal />
            <form>
              <MainView />
            </form>
          </FormProvider>
        </DialogDataContext.Provider>
      </DraftDispatchContext.Provider>
    </DraftStateContext.Provider>
  );
};

export default CreatorPage;
