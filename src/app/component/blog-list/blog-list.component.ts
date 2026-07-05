import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Iblog } from 'src/app/models/blog';
import { BlogService } from 'src/app/service/blog.service';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';
import { SnakbarService } from 'src/app/service/snakbar.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  blogData!: Array<Iblog>
  constructor(
    private _blogservice: BlogService,
    private matdilog : MatDialog,
    private snakbar : SnakbarService
  ) { }

  ngOnInit(): void {
    this.getblogs()
    this.updateuICheck()
  }

  getblogs() {
    this._blogservice.getBlogs().subscribe({
      next: res => {
        this.blogData = res.data
        console.log(res)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  trackbydun(index : number, item : Iblog){
    return item.id;
  }

  onRemove(id :string){
    this.matdilog.open(GetconfirmComponent,{
      width : '500px',
      disableClose : true,
      data : `Are you sure do you want to remove this Blog with id ${id}`
    }).afterClosed().subscribe(res => {
      if(res){
        this._blogservice.removeBlog(id).subscribe({
          next : res => {
            console.log(res)
            this.getblogs()
            this.snakbar.OpenSnakbar(res.message)
          },
          error : err => {
            console.log(err)
            this.snakbar.OpenSnakbar(err.message)
          }
        })
      }
    })
  }

  updateuICheck(){
    this._blogservice.refreshDateCheck$.subscribe(res => {
      if(res === true){
        this.getblogs()
      }
    })
  }

  onEdit(blog : Iblog){
    this._blogservice.EditBlogObj$.next(blog)
  }
}
