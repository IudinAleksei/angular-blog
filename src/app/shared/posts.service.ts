import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { IFirebaseCreateResponse, IPost } from './interafaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: IPost): Observable<IPost> {
    return this.http.post<IFirebaseCreateResponse>(`${environment.fbDbUrl}/posts.json`, post).pipe(
      map((response: IFirebaseCreateResponse) => ({
        ...post,
        id: response.name,
        date: new Date(post.date),
      })),
    );
  }
}
