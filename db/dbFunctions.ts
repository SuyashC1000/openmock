import { TestPaper } from "@/app/_interface/testData";
import { db } from "./db";
import { TestResponse } from "@/app/_interface/testResponse";

export async function setActiveTestPaper(testPaper: TestPaper) {
  await db.activeTestPaper.clear();
  await db.activeTestPaper.add(testPaper);
}

export async function setActiveTestResponse(testResponse: TestResponse) {
  await db.activeTestResponse.clear();
  await db.activeTestResponse.add(testResponse);
}
