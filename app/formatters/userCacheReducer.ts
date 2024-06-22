import { UserCache } from "../interface/userCache";
import example from "../../public/data/userCache.json";
import { getActiveQuestionCache, getActiveSectionCache } from "./getFunctions";

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
    case "set_active_section": {
      let newState = structuredClone(state);
      let activeGroupCache = newState.body[state.activeGroupIndex];

      activeGroupCache.activeSectionIndex = action.payload;

      return newState;
    }
    case "set_active_group": {
      let newState = structuredClone(state);

      newState.activeGroupIndex = action.payload;

      return newState;
    }
    case "update_question_status": {
      let newState = structuredClone(state);
      let activeGroupCache = newState.body[state.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[action.payload.qIndex].status =
        action.payload.newStatus;

      return newState;
    }
    default:
      return state;
  }
}
