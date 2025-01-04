import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../common/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Update with your Node.js API base URL

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update an existing user
  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user._id}`, user);
  }

  // Delete a user
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
