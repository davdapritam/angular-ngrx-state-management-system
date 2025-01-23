import { Component, Input } from '@angular/core';
import { Post } from 'src/app/common/models/post';
import { AddUpdatePostComponent } from '../add-update-post/add-update-post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {

  @Input() post!: Post;

  constructor(private dialog: MatDialog) {
  }

  update() {
    this.dialog.open(AddUpdatePostComponent, {
      width: '400px', data: this.post
    });
  }

  delete() {
    // this.userHandler.deleteUser(this.post._id);
  }

}
