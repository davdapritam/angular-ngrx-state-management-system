import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {Injectable} from "@angular/core";

@Injectable()
export class HttpService {

  private baseUrl: string = 'http://localhost:3000';
  AUTH_TOKEN = 'auth_token';

  constructor(private http: HttpClient) { }

  get(url: string, params?: any): Observable<any> {
    const data = {params}
    return this.http.get(this.baseUrl + url, data).pipe(catchError(this.errorHandler.bind(this)));
  }

  post(url: string, body: any): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.post(this.baseUrl + url, body, { headers }).pipe(catchError(this.errorHandler.bind(this)));
  }

  // PUT method
  put(url: string, body: any): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.put(this.baseUrl + url, body, { headers }).pipe(catchError(this.errorHandler.bind(this)));
  }

  // DELETE method
  delete(url: string): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.delete(this.baseUrl + url, { headers }).pipe(catchError(this.errorHandler.bind(this)));
  }


  private errorHandler(response: any) {

    console.log("ERROR HANDLER", response);

    const error = response.error;
    const keys = Object.keys(error)
    const key = keys[0];

    let message = error[key];

    if (error[key] instanceof Array) {
      message = error[key];
    }

    if (key === "isTrusted"){
      message = "Internet Connection Failed";
    }else{
      message = key + " : " + error[key];
    }

    return throwError({messages: message, error});
  }

  private getAuthHeader(): { [header: string]: string | string[]; } {
    return {
      Authorization: `Bearer ${localStorage.getItem(this.AUTH_TOKEN)}`
    };
  }

}
