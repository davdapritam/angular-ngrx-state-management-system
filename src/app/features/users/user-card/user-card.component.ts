import {Component, Input} from '@angular/core';
import {User} from "../../../common/models/user";
import {AddUpdateUserComponent} from "../add-update-user/add-update-user.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user!: User;

  constructor(private dialog: MatDialog, private userService: UserService) {
  }

  update() {
    this.dialog.open(AddUpdateUserComponent, {
      width: '400px', data: this.user
    });
  }

  delete() {
    this.userService.deleteUser(this.user._id).subscribe((res) => {
      console.log(res);
    });
  }
}
