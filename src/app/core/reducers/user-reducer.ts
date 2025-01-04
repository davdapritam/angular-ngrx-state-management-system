import {User} from "../../common/models/user";
import {Action} from "../actions";
import {USER_LIST_REQUEST, USER_LIST_SUCCESS} from "../actions/user-action";

export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: {[id : string]: User};
  ids : string[];
}

export const initialState: UserReducerState = {
  loading: false,
  loaded: false,
  error: false,
  entities : {},
  ids: []
}

export function UserReducer(state = initialState, action: Action) : UserReducerState {

  switch (action.type) {
    case USER_LIST_REQUEST : {
      return {...state, loading: true};
    }
    // case USER_LIST_SUCCESS : {
    //   const users = action.payload.data;
    //   return {...state, loading: false, loaded: true, entities: users};
    // }
    default: {
      return state;
    }
  }

}
