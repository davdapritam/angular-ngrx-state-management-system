import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { User } from '../common/models/user';
import {HttpService} from "./http-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Update with your Node.js API base URL

  constructor(private http: HttpService) {}

  // Fetch all users
  getUsers() : Observable<User[]>{
    return this.http.get('/api/users').pipe(map(data => data.data as User[]));
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    return this.http.post(this.apiUrl, user);
  }

  // Update an existing user
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${user._id}`, user);
  }

  // Delete a user
  deleteUser(userId: string): Observable<void> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
