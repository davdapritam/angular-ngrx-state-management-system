import {User} from "../../common/models/user";

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

export function UserReducer(){
  
}
