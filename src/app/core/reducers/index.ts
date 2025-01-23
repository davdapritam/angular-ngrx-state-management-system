import * as fromUser from "./user-reducer";
import * as fromPost from "./post-reducer";
import { ActionReducerMap, createSelector } from "@ngrx/store";

export interface RootReducerState {
  users: fromUser.UserReducerState;
  posts: fromPost.PostReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUser.UserReducer,
  posts: fromPost.PostReducer
}


export const getUserState = (state: RootReducerState) => state.users;

export const getPostState = (state: RootReducerState) => state.posts;

// USER
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUserLoading = createSelector(getUserState, fromUser.getLoading);
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUserError = createSelector(getUserState, fromUser.getError);


// POSTS

export const getPostLoaded = createSelector(getPostState, fromPost.getLoaded);
export const getPostLoading = createSelector(getPostState, fromPost.getLoading);
export const getPosts = createSelector(getPostState, fromPost.getPosts);
export const getPostError = createSelector(getPostState, fromPost.getError);