import { UserCache } from "../interface/userCache";
import example from "../../public/data/userCache.json";

export interface Action {
  type: string;
  payload: any;
}

export default function userCacheReducer(
  state: UserCache,
  action: Action
): UserCache {
  switch (action.type) {
    case "set_active_question": {
      let newState = structuredClone(state);
      let activeGroupCache = newState.body[state.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.qIndex = action.payload;

      return newState;
    }
    case "update_question_status": {
      let newState = structuredClone(state);
      let activeGroupCache = newState.body[state.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];
      let activeQuestionCache =
        activeSectionCache.questions[activeSectionCache.qIndex];

      activeQuestionCache.status = action.payload;

      return newState;
    }
    default:
      return state;
  }
}
