import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iblog } from 'src/app/models/blog';
import { BlogService } from 'src/app/service/blog.service';
import { SnakbarService } from 'src/app/service/snakbar.service';

@Component({
  selector: 'app-blogform',
  templateUrl: './blogform.component.html',
  styleUrls: ['./blogform.component.scss']
})
export class BlogformComponent implements OnInit {

  isinEditMode : boolean = false
  EditObj! : Iblog
  @ViewChild('blogform') blogform! : NgForm
  constructor(
    private blogservice : BlogService,
    private snakbar : SnakbarService
  ) { }

  ngOnInit(): void {
    this.patchForm()
  }

  onBlogAdd(){
    let newObj : Iblog = {
      ...this.blogform.value
    }
    
    this.blogservice.PostBlog(newObj).subscribe({
      next : res => {
        this.snakbar.OpenSnakbar(res.message)
        this.blogservice.refreshDateCheck$.next(true)
        this.blogform.reset()
      },
      error : err => {
        this.snakbar.OpenSnakbar(err.error.message)
      }
    })
  }

  patchForm(){
    this.blogservice.EditBlogObj$.subscribe(res => {
      this.isinEditMode = true;
      this.blogform.form.patchValue(res)
      this.EditObj = res
    })
  }

  onUpdate(){
    let Updated_obj : Iblog = {
      ...this.blogform.value
    }

    this.blogservice.updateBlog(this.EditObj.id, Updated_obj).subscribe({
      next : res => {
        this.snakbar.OpenSnakbar(res.message)
        this.blogservice.refreshDateCheck$.next(true)
        this.isinEditMode = false;
        this.blogform.form.reset()
      },
      error : err => {
        this.snakbar.OpenSnakbar(err.error.message)
      }
    })
  }
}
