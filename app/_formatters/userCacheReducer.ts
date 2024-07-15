import { UserCache } from "../_interface/userCache";
import example from "../../public/data/userCache.json";

export interface Action {
  type: string;
  payload: any;
}

export const INITIALIZE_STATE = "INITIALIZE_STATE";
export const SET_TEST_STATUS = "SET_TEST_STATUS";
export const SET_ACTIVE_QUESTION = "SET_ACTIVE_QUESTION";
export const SET_ACTIVE_SECTION = "SET_ACTIVE_SECTION";
export const SET_DEFAULT_LANGUAGE = "SET_DEFAULT_LANGUAGE";
export const SET_START_TIME = "SET_START_TIME";
export const SET_LOGIN_TIME = "SET_LOGIN_TIME";
export const SET_ACTIVE_GROUP = "SET_ACTIVE_GROUP";
export const SET_ACTIVE_ELEMENTS = "SET_ACTIVE_ELEMENTS";
export const UPDATE_QUESTION_STATUS = "UPDATE_QUESTION_STATUS";
export const UPDATE_QUESTION_USERANSWER = "UPDATE_QUESTION_USERANSWER";
export const UPDATE_QUESTION_LASTANSWERED = "UPDATE_QUESTION_LASTANSWERED";
export const UPDATE_QUESTION_PERMISSIONS = "UPDATE_QUESTION_PERMISSIONS";
export const TOGGLE_SECTION_ISSELECTED = "TOGGLE_SECTION_ISSELECTED";
export const UPDATE_GROUP_STATUS = "UPDATE_GROUP_STATUS";
export const UPDATE_GROUP_TIMESPENT = "UPDATE_GROUP_TIMESPENT";
export const UPDATE_QUESTION_TIMESPENT = "UPDATE_QUESTION_TIMESPENT";
export const RESET_SECTION_ATTEMPTS = "RESET_SECTION_ATTEMPTS";
export const SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL";
export const SET_CALCULATOR_VISIBILITY = "SET_CALCULATOR_VISIBILITY";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SET_GROUP_HASOPTED = "SET_GROUP_HASOPTED";

export default function userCacheReducer(
  state: UserCache,
  action: Action
): UserCache {
  let newState = structuredClone(state);

  switch (action.type) {
    case INITIALIZE_STATE: {
      newState = action.payload;

      return newState;
    }

    case SET_TEST_STATUS: {
      newState.testStatus = action.payload;
      return newState;
    }

    case SET_ACTIVE_QUESTION: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.qIndex = action.payload;
      return newState;
    }

    case SET_ACTIVE_SECTION: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      activeGroupCache.activeSectionIndex = action.payload;

      return newState;
    }

    case SET_DEFAULT_LANGUAGE: {
      newState.currentLanguageIndex = action.payload;

      return newState;
    }

    case SET_START_TIME: {
      newState.testStartTime = action.payload;

      return newState;
    }
    case SET_LOGIN_TIME: {
      newState.testLoginTime = action.payload;

      return newState;
    }

    case SET_ACTIVE_GROUP: {
      newState.activeGroupIndex = action.payload;

      return newState;
    }
    case SET_ACTIVE_ELEMENTS: {
      newState.activeGroupIndex = action.payload[0];

      let activeGroupCache = newState.body[newState.activeGroupIndex];
      activeGroupCache.activeSectionIndex = action.payload[1];

      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];
      activeSectionCache.qIndex = action.payload[2];

      return newState;
    }

    case UPDATE_QUESTION_STATUS: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[action.payload.qIndex].status =
        action.payload.newStatus;

      return newState;
    }

    case UPDATE_QUESTION_USERANSWER: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[activeSectionCache.qIndex].submit =
        action.payload;

      return newState;
    }

    case UPDATE_QUESTION_LASTANSWERED: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[activeSectionCache.qIndex].lastAnswered =
        action.payload;

      return newState;
    }

    case UPDATE_QUESTION_PERMISSIONS: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[activeSectionCache.qIndex].permissions =
        action.payload;

      return newState;
    }

    case UPDATE_QUESTION_TIMESPENT: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let activeSectionCache =
        activeGroupCache.sections[activeGroupCache.activeSectionIndex];

      activeSectionCache.questions[activeSectionCache.qIndex].timeSpent =
        action.payload;

      return newState;
    }

    case TOGGLE_SECTION_ISSELECTED: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let sectionCache = activeGroupCache.sections[action.payload];
      let isSelected = sectionCache.selected;
      sectionCache.selected = !isSelected;
      return newState;
    }

    case UPDATE_GROUP_STATUS: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      activeGroupCache.status = action.payload;

      return newState;
    }

    case UPDATE_GROUP_TIMESPENT: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      activeGroupCache.timeSpent = action.payload;

      return newState;
    }

    case RESET_SECTION_ATTEMPTS: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      let questions = activeGroupCache.sections[action.payload].questions;
      for (let i = 0; i < questions.length; i++) {
        let oldStatus = questions[i].status;
        let newStatus = oldStatus === 2 ? 1 : oldStatus === 4 ? 3 : oldStatus;
        questions[i].status = newStatus;
        questions[i].submit = null;
      }

      return newState;
    }

    case SET_ZOOM_LEVEL: {
      newState.preferences.zoomLevel = action.payload;

      return newState;
    }

    case SET_CALCULATOR_VISIBILITY: {
      newState.preferences.calculator = action.payload;

      return newState;
    }

    case TOGGLE_SIDEBAR: {
      newState.preferences.sidebarCollapsed =
        !newState.preferences.sidebarCollapsed;

      return newState;
    }

    case SET_GROUP_HASOPTED: {
      let activeGroupCache = newState.body[newState.activeGroupIndex];
      activeGroupCache.hasOpted = action.payload;

      return newState;
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
