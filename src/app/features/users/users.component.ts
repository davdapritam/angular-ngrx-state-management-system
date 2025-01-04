import {Component, OnInit} from '@angular/core';
import {User} from "../../common/models/user";
import {AddUpdateUserComponent} from "./add-update-user/add-update-user.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  users: User[] = [];
  loading = false;
  error = false;
  isAlive = true;

  constructor(private dialog: MatDialog, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      console.log(res);
      this.users = res.data;
    })
  }

  addUser() {
    this.dialog.open(AddUpdateUserComponent, {
      width: '400px'
    });
  }

}
