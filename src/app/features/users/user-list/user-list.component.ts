import {Component, Input} from '@angular/core';
import {User} from "../../../common/models/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: User[] = [];

  constructor() {
  }
}
