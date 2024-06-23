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
  let newState = structuredClone(state);

  switch (action.type) {
    case "set_active_question": {
      let activeGroupCache = newState.body[state.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.qIndex = action.payload;

      // let activeQuestionStatus =
      //   activeSectionCache.questions[activeSectionCache.qIndex].status;

      // console.log("status: " + activeQuestionStatus);
      // console.log(activeQuestionStatus == 0);

      // activeQuestionStatus =
      //   activeQuestionStatus == 0 ? 1 : activeQuestionStatus;
      // console.log("status: " + activeQuestionStatus);

      return newState;
    }

    case "set_active_section": {
      let activeGroupCache = newState.body[state.activeGroupIndex];
      activeGroupCache.activeSectionIndex = action.payload;

      return newState;
    }

    case "set_active_group": {
      newState.activeGroupIndex = action.payload;

      return newState;
    }

    case "update_question_status": {
      let activeGroupCache = newState.body[state.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[action.payload.qIndex].status =
        action.payload.newStatus;

      return newState;
    }

    case "update_question_useranswer": {
      let activeGroupCache = newState.body[state.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[activeSectionCache.qIndex].submit =
        action.payload;

      return newState;
    }

    default:
      return state;
  }
}
