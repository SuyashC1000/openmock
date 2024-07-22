import { TestPaper } from "@/app/_interface/testData";
import { TestResponse } from "@/app/_interface/testResponse";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("FriendsDatabase") as Dexie & {
  activeTestPaper: EntityTable<TestPaper, "id">;
  testPapers: EntityTable<TestPaper, "id">;

  activeTestResponse: EntityTable<TestResponse, "attemptId">;
  testResponses: EntityTable<TestResponse, "attemptId">;
};

db.version(1).stores({
  activeTestPaper: "id",
  testPapers: "id",

  activeTestResponse: "attemptId",
  testResponses: "attemptId",
});

export { db };
