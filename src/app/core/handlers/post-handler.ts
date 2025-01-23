import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getPostError, getPostLoaded, getPostLoading, getPosts, RootReducerState } from "../reducers";
import { combineLatest, Observable, take } from "rxjs";
import { PostService } from "src/app/services/post.service";
import { PostAddAction, PostListErrorAction, PostListRequestAction, PostListSuccessAction } from "../actions/post-action";
import { Post } from "src/app/common/models/post";


@Injectable()
export class PostHandler {

    constructor(private store: Store<RootReducerState>, private postService: PostService) {

    }

    getPostList(force = false): [Observable<boolean>, Observable<Post[]>, Observable<boolean>] {
        const loaded$ = this.store.select(getPostLoaded);
        const loading$ = this.store.select(getPostLoading);
        const error$ = this.store.select(getPostError);
        const getPostsData$ = this.store.select(getPosts);

        combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {

            if ((!data[0] && !data[1]) || force) {
                this.store.dispatch(new PostListRequestAction());
                this.postService.getPosts().subscribe((res) => {
                    this.store.dispatch(new PostListSuccessAction({ data: res }));
                }, error => {
                    this.store.dispatch(new PostListErrorAction());
                })
            }

        })

        return [
            loading$,
            getPostsData$,
            error$
        ]
    }

    addPost(data: Post) {
        this.postService.addPost(data).subscribe((res) => {
            this.store.dispatch(new PostAddAction({ data: res }));
        })
    }

}