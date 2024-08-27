import { TestPaper } from "../_interface/testData";
import { Action } from "./userCacheReducer";

export const INITIALIZE_STATE = "INITIALIZE_STATE";

export default function testDraftReducer(state: TestPaper, action: Action) {
  let newState = structuredClone(state);

  switch (action.type) {
    case INITIALIZE_STATE: {
      return action.payload;
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
