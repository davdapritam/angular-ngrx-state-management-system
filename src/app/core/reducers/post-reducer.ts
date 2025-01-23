import { Post } from "src/app/common/models/post";
import { Action } from "../actions";
import { POST_ADD, POST_LIST_ERROR, POST_LIST_REQUEST, POST_LIST_SUCCESS } from "../actions/post-action";
import { StoreUtils } from "../utils/store-utils";
import { createSelector } from "@ngrx/store";


export interface PostReducerState {
    loading: boolean;
    loaded: boolean;
    error: boolean;
    entities: { [id: string]: Post };
    ids: string[];
}

export const initialState: PostReducerState = {
    loading: false,
    loaded: false,
    error: false,
    entities: {},
    ids: []
}

export function PostReducer(state = initialState, action: Action): PostReducerState {

    switch (action.type) {

        case POST_LIST_REQUEST: {
            return { ...state, loading: true };
        }
        case POST_LIST_SUCCESS: {

            const posts = action.payload.data;
            const normalizeObject = StoreUtils.normalize(posts);
            const newEntities = { ...state.entities, ...normalizeObject };
            const ids = posts.map((i: Post) => i._id);
            const newIds = StoreUtils.filterDuplicateIds([...state.ids, ...ids]);

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
        case POST_LIST_ERROR: {

            return { ...state, error: true };
        }
        case POST_ADD: {

            const post = action.payload.data;
            const entity = { [post._id]: post };
            const newEntities = { ...state.entities, ...entity };
            const newIds = StoreUtils.filterDuplicateIds([...state.ids, post._id]);

            return {
                ...state, ...{
                    entities: newEntities,
                    ids: newIds
                }
            }
        }

        default: {
            return state
        }
    }

}

export const getLoading = (state: PostReducerState) => state.loading;
export const getLoaded = (state: PostReducerState) => state.loaded;
export const getError = (state: PostReducerState) => state.error;
export const getEntities = (state: PostReducerState) => state.entities;
export const getPosts = createSelector(getEntities, (entities) => StoreUtils.unNormalize(entities));