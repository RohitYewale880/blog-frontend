import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iblog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogUrl :string = environment.blogUrl
  refreshDateCheck$ : Subject<boolean> = new Subject<boolean>()
  EditBlogObj$ : Subject<Iblog> = new Subject<Iblog>()
  constructor(
    private _http : HttpClient
  ) { 
    console.log('Blog URL:', this.blogUrl);
  }

  getBlogs() : Observable<any>{
    return this._http.get<any>(this.blogUrl)
  }

  PostBlog(blog : Iblog): Observable<any>{
    return this._http.post<any>(this.blogUrl, blog)
  }

  updateBlog(id: string, blog: Iblog): Observable<any> {
    return this._http.patch<any>(`${this.blogUrl}/${id}`, blog);
  }

  removeBlog(id :string){
    let delete_Url = `${this.blogUrl}/${id}`
    return this._http.delete<any>(delete_Url)
  }
}
