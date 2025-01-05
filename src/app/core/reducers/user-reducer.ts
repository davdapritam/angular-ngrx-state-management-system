import {User} from "../../common/models/user";
import {Action} from "../actions";
import {
  USER_ADD,
  USER_DELETE,
  USER_LIST_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE
} from "../actions/user-action";
import {StoreUtils} from "../utils/store-utils";
import {createSelector} from "@ngrx/store";

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
    case USER_LIST_SUCCESS : {
      const users = action.payload.data;
      const normalizeObject = StoreUtils.normalize(users);
      const newEntities = {...state.entities, ...normalizeObject};
      const ids = users.map((user: User) => user._id);
      const newIds = StoreUtils.filterDuplicateIds([...state.ids, ...ids])

      return {
        ...state, ...{
          loading: false,
          loaded: true,
          error: false,
          entities: newEntities,
          ids: newIds
        }
      };
    }
    case USER_LIST_ERROR : {
      return {...state, error: true};
    }
    case USER_ADD : {

      const user = action.payload.data;
      const entity = {[user._id]: user};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtils.filterDuplicateIds([...state.ids, user._id]);
      return {...state, ...{entities: newEntities, ids: newIds}};
    }
    case USER_UPDATE:{
      const user = action.payload.data;
      const entity = {[user._id]: user};
      const newEntities = {...state.entities, ...entity};
      return {...state, ...{entities: newEntities}};
    }
    case USER_DELETE : {
      const userId = action.payload.id;
      const newIds = state.ids.filter(id => id !== userId);
      const newEntities = StoreUtils.removeKeys(state.entities, userId);
      console.log("newEntities",  newEntities);
      return {...state, ...{entities : newEntities, ids : newIds}}
    }
    default: {
      return state;
    }
  }

}

export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getError = (state: UserReducerState) => state.error;
export const getEntities = (state: UserReducerState) => state.entities;
export const getUsers = createSelector(getEntities, (entities) => StoreUtils.unNormalize(entities));
