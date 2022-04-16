import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  signup(data: any): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'signup.php', data);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'login.php', data);
  }
  createPost(data: any): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'insert_blog.php', data);
  }
  updatePost(data: any): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'update_blog.php', data);
  }
  getPost(params: any): Observable<any> {
    return this.http.get<any>(environment.API_URL + 'get_blogs.php', {params});
  }

}
