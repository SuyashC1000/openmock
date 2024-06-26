import { UserCache } from "../_interface/userCache";
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
    case "set_test_status": {
      newState.testStatus = action.payload;
      return newState;
    }

    case "set_active_question": {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.qIndex = action.payload;
      return newState;
    }

    case "set_active_section": {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      activeGroupCache.activeSectionIndex = action.payload;

      return newState;
    }

    case "set_default_language": {
      newState.currentLanguageIndex = action.payload;

      return newState;
    }

    case "set_start_time": {
      newState.testStartTime = action.payload;

      return newState;
    }
    case "set_login_time": {
      newState.testLoginTime = action.payload;

      return newState;
    }

    case "set_active_group": {
      newState.activeGroupIndex = action.payload;

      return newState;
    }
    case "set_active_elements": {
      newState.activeGroupIndex = action.payload[0];

      let activeGroupCache = newState.body[newState.activeGroupIndex];
      activeGroupCache.activeSectionIndex = action.payload[1];

      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];
      activeSectionCache.qIndex = action.payload[2];

      return newState;
    }

    case "update_question_status": {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[action.payload.qIndex].status =
        action.payload.newStatus;

      return newState;
    }

    case "update_question_useranswer": {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[activeSectionCache.qIndex].submit =
        action.payload;

      return newState;
    }

    case "update_question_lastanswered": {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[activeSectionCache.qIndex].lastAnswered =
        action.payload;

      return newState;
    }

    case "update_question_permissions": {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[activeSectionCache.qIndex].permissions =
        action.payload;

      return newState;
    }

    case "toggle_section_isselected": {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let sectionCache = activeGroupCache.sections[action.payload];
      let isSelected = sectionCache.selected;
      sectionCache.selected = !isSelected;

      // console.log(isSelected);

      // isSelected = !isSelected;
      // console.log(isSelected);

      return newState;
    }

    default:
      return state;
  }
}
