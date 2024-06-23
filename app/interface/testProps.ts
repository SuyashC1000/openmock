import { TestPaper } from "./testData";
import { UserCache } from "./userCache";

export interface TestProps {
  state: UserCache;
  dispatch: Function;
  testPaper: TestPaper;
}

export interface DispatchFunc {
  (action: { type: string; payload: any }): void;
}

export interface SetResponseDataFunc {
  (value: any[]): void;
}
