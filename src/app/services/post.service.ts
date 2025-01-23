import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Post } from '../common/models/post';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpService) { }

  getPosts(): Observable<Post[]> {
    return this.http.get('/post').pipe(map(data => data.data as Post[]));
  }

  addPost(data: Post): Observable<Post> {
    return this.http.post('/post', data).pipe(map(res => res.data as Post));
  }

}
