import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseurl + 'customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(baseUrl + '/login', {
      username,
      password
    }, httpOptions);
  }

  register(email: string, username: string, password: string): Observable<any> {
    return this.http.post(baseUrl + '/register', {
      email,
      username,
      password
    }, httpOptions)
  }
}
