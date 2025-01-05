import {Injectable} from "@angular/core";
import {getUserError, getUserLoaded, getUserLoading, getUsers, RootReducerState} from "../reducers";
import {Store} from "@ngrx/store";
import {combineLatest, Observable, take} from "rxjs";
import {
  UserAddAction,
  UserDeleteAction,
  UserListErrorAction,
  UserListRequestAction,
  UserListSuccessAction,
  UserUpdateAction
} from "../actions/user-action";
import {UserService} from "../../services/user.service";
import {User} from "../../common/models/user";

@Injectable()
export class UserHandler {
  constructor(private store: Store<RootReducerState>, private userService: UserService) {
  }

  getUserList(force = false): [Observable<boolean>, Observable<User[]>, Observable<boolean>] {
    const loaded$ = this.store.select(getUserLoaded);
    const loading$ = this.store.select(getUserLoading);
    const error$ = this.store.select(getUserError);
    const getUsersData$ = this.store.select(getUsers);

    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new UserListRequestAction());
        this.userService.getUsers().subscribe(res => {
          this.store.dispatch(new UserListSuccessAction({data: res}));
        }, error => {
          this.store.dispatch(new UserListErrorAction());
        })
      }
    });

    return [
      loading$,
      getUsersData$,
      error$
    ]
  }

  addUser(data: User) {
    this.userService.addUser(data).subscribe((res) => {
      this.store.dispatch(new UserAddAction({data: res}))
    });
  }

  updateUser(data: User) {
    this.userService.updateUser(data).subscribe((res) => {
      this.store.dispatch(new UserUpdateAction({data: res}))
    })
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe((res) => {
      if (res.statusCode === 200) {
        this.store.dispatch(new UserDeleteAction({id: userId}))
      }
    });
  }

}
