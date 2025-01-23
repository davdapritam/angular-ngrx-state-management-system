import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/common/models/post';
import { AddUpdatePostComponent } from './add-update-post/add-update-post.component';
import { MatDialog } from '@angular/material/dialog';
import { PostHandler } from 'src/app/core/handlers/post-handler';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  error: boolean = false;
  posts: Post[] = [];
  isAlive: boolean = true;

  constructor(private dialog: MatDialog, private postHandler: PostHandler) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  fetchData() {

    const observer$ = this.postHandler.getPostList();

    const loading$ = observer$[0];
    const postData$ = observer$[1];
    const error$ = observer$[2];

    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.loading = data;
    })

    postData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.posts = data;
    })

    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.error = data;
    })

  }

  addPost() {
    this.dialog.open(AddUpdatePostComponent, {
      width: '400px'
    });
  }


}
