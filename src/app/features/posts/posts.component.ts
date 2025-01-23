import { Component } from '@angular/core';
import { Post } from 'src/app/common/models/post';
import { AddUpdatePostComponent } from './add-update-post/add-update-post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  loading: boolean = false;
  error: boolean = false;
  posts: Post[] = [];


  constructor(private dialog: MatDialog) {
  }

  addPost() {
    this.dialog.open(AddUpdatePostComponent, {
      width: '400px'
    });
  }


}
