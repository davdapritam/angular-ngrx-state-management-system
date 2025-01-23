import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/common/models/post';
import { PostHandler } from 'src/app/core/handlers/post-handler';

@Component({
  selector: 'app-add-update-post',
  templateUrl: './add-update-post.component.html',
  styleUrls: ['./add-update-post.component.scss']
})
export class AddUpdatePostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddUpdatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post, private postHandler: PostHandler) {
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(this.data ? this.data.title : null, [Validators.required]),
      description: new FormControl(this.data ? this.data.description : null, [Validators.required])
    });
  }

  addOrUpdatePost() {
    if (this.data) {
      this.updatePost();
    } else {
      this.addPost();
    }
  }

  updatePost() {
    // const updatedPost = { ...this.data, ...this.postForm.value };
    this.dialogRef.close();
  }

  addPost() {
    this.postHandler.addPost(this.postForm.value);
    this.dialogRef.close();
  }

}
