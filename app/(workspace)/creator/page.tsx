"use client";

import React from "react";
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
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

export const DraftStateContext = React.createContext(emptyTestPaper);

export const DraftDispatchContext = React.createContext(function example(
  action: Action
) {});

const CreatorPage = () => {
  const [state, dispatch] = React.useReducer(testDraftReducer, emptyTestPaper);

  const [fetchedTestPaper, loaded]: [TestPaper, boolean] | [] = useLiveQuery(
    () =>
      db.activeTestPaper.toArray().then((response) => {
        const finalResponse =
          response[0] ?? testDraftGenerator(Date.now(), "0");
        dispatch({ type: INITIALIZE_STATE, payload: finalResponse });
        return [finalResponse, true];
      }),
    [],
    []
  );

  const methods = useForm<TestPaper>({ values: fetchedTestPaper });
  const onSubmit: SubmitHandler<TestPaper> = (data: any) => console.log(data);

  if (!loaded) return <Loading />;

  return (
    <DraftStateContext.Provider value={state}>
      <DraftDispatchContext.Provider value={dispatch}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <MainView />
          </form>
        </FormProvider>
      </DraftDispatchContext.Provider>
    </DraftStateContext.Provider>
  );
};

export default CreatorPage;
