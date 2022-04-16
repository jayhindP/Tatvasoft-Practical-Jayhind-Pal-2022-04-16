import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: any = {};
  public posts: any = [];
  public submitLoading: boolean = false;
  public showForm: boolean = true;
  public form = new FormGroup({
    id: new FormControl(null),
    user_id: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private blog: BlogService
  ){}

  ngOnInit(): void {
    if(localStorage.getItem("user") !== null){
      const userdata:any = localStorage.getItem("user");
      this.user = JSON.parse(userdata);
      this.getPosts();
    }else{
      this.toaster.success("Please Login First");
      this.router.navigate(['/login']);
    }
  }
  getPosts(): void {
    let params = {
      user_id: this.user.role==='Admin'?'':this.user.id
    };
     
    this.blog.getPosts(params).subscribe((res: any)=> {
      if(res.status===1)
      {
        this.posts = res.data;
        this.showForm = false;
      }else{
        this.showForm = true;
        // this.toaster.error(res.data);
      }
    },(e)=>{
      // this.toaster.error(e?.error.message);
    })
  }
  editPost(item: any): void {
    this.showForm = true;
    this.form.patchValue(item);
  }
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  formSubmit(): void {
    this.submitLoading = true;
    if(this.form.invalid){
      for(let key in this.form.controls){
        this.form.controls[key].markAsDirty();
      }
      this.submitLoading = false;
      return ;
    }else{
      let jsonValues = this.form.value;
      let formData = new FormData();
      for(let key in jsonValues){
        formData.append(key, jsonValues[key]);
      }

      if(this.form.controls.id.value)
      {
        this.blog.updatePost(formData).subscribe((res: any)=> {
          if(res.status===1)
          {
            this.submitLoading = false;
            this.form.reset();
            this.toaster.success("Post has been update");
            this.getPosts();
          }else{
            this.submitLoading = false;
            this.toaster.error(res.data);
          }
        },(e)=>{
          this.submitLoading = false;
          this.toaster.error(e?.error.message);
        })
      }else{
        this.blog.createPost(formData).subscribe((res: any)=> {
          if(res.status===1)
          {
            this.submitLoading = false;
            this.form.reset();
            this.toaster.success("Post has been added");
            this.getPosts();
          }else{
            this.submitLoading = false;
            this.toaster.error(res.data);
          }
        },(e)=>{
          this.submitLoading = false;
          this.toaster.error(e?.error.message);
        })
      }
    }
  }

  deletePost(id: any): void {
    this.submitLoading = true;
    let formData = new FormData();
    formData.append('id', id);

    this.blog.deletePost(formData).subscribe((res: any)=> {
      if(res.status===1)
      {
        this.submitLoading = false;
        this.toaster.success("Post has been deleted");
        this.getPosts();
      }else{
        this.submitLoading = false;
        this.toaster.error(res.data);
      }
    },(e)=>{
      this.submitLoading = false;
      this.toaster.error(e?.error.message);
    })
  }

}
