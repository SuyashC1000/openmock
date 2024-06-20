import { UserCache } from "../interface/userCache";
import example from "../../public/data/userCache.json";

interface Action {
  type: number;
  payload: any;
}

export default function userCacheReducer(
  state: UserCache,
  action: Action
): UserCache {
  switch (action.type) {
    default:
      return state;
  }
}
