import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {User} from '../common/models/user';
import {HttpService} from "./http-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) {}

  // Fetch all users
  getUsers() : Observable<User[]>{
    return this.http.get('/api/users').pipe(map(data => data.data as User[]));
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    return this.http.post('/api/users', user).pipe(map(data => data.data as User));
  }

  // Update an existing user
  updateUser(user: User): Observable<any> {
    return this.http.put(`/api/users/${user._id}`, user).pipe(map(data => data.data as User));
  }

  // Delete a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`/api/users/${userId}`);
  }
}
