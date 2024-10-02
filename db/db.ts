import { TestPaper } from "@/app/_interface/testData";
import { TestResponse } from "@/app/_interface/testResponse";
import { UserData } from "@/app/_interface/userData";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("FriendsDatabase") as Dexie & {
  activeTestPaper: EntityTable<TestPaper, "id">;
  testPapers: EntityTable<TestPaper, "id">;

  activeTestResponse: EntityTable<TestResponse, "attemptId">;
  testResponses: EntityTable<TestResponse, "attemptId">;

  testDrafts: EntityTable<Partial<TestPaper>, "id">;
  activeTestDraft: EntityTable<Partial<TestPaper>, "id">;

  userData: EntityTable<UserData, "id">;
};

db.version(1).stores({
  activeTestPaper: "id",
  testPapers: "id",

  activeTestResponse: "attemptId",
  testResponses: "attemptId, testId",

  testDrafts: "id",
  activeTestDraft: "id",

  userData: "id",
});

export { db };
