import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../common/models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss']
})
export class AddUpdateUserComponent implements OnInit{
  userForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddUpdateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : null, [Validators.required]),
      email: new FormControl(this.data ? this.data.email : null, [Validators.required])
    });
  }

  addOrUpdateUser() {
    if (this.data) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  updateUser() {
    const updatedUser = {...this.data, ...this.userForm.value};
    this.userService.updateUser(updatedUser).subscribe((res) => {
      console.log(res);
    });
    this.dialogRef.close();
  }

  addUser() {
    this.userService.addUser(this.userForm.value).subscribe((res) => {
      console.log(res);
    });
    this.dialogRef.close();
  }

}
