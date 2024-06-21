import { TestPaper } from "./testData";
import { UserCache } from "./userCache";

export interface TestProps {
  state: UserCache;
  dispatch: Function;
  testPaper: TestPaper;
}

interface DispatchFunc {
  (type: string, payload: any): void;
}
