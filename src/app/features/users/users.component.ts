import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../common/models/user";
import {AddUpdateUserComponent} from "./add-update-user/add-update-user.component";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {RootReducerState} from "../../core/reducers";
import {UserHandler} from "../../core/handlers/user-handler";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  error = false;
  isAlive = true;

  constructor(private dialog: MatDialog, private userHandler: UserHandler, private store: Store<RootReducerState>) {
  }

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchData(){

    const observer$ = this.userHandler.getUserList();

    const loading$ = observer$[0];
    const userData$ = observer$[1];
    const error$ = observer$[2];

    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.loading = data;
    })

    userData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.users = data;
    })

    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.error = data;
    })

  }

  addUser() {
    this.dialog.open(AddUpdateUserComponent, {
      width: '400px'
    });
  }

}
