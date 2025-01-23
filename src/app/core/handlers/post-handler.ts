import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootReducerState } from "../reducers";


@Injectable()
export class PostHandler {

    constructor(private store: Store<RootReducerState>) {

    }

}