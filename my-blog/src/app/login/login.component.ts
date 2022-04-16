import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public submitLoading: boolean = false;
  public form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private blog: BlogService,
  ) { }

  ngOnInit(): void {
    
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
      this.blog.login(formData).subscribe((res: any)=> {
        this.submitLoading = false;
        this.toaster.success("You are logged-in Successfully.");
        localStorage.setItem("user", JSON.stringify(res));
        this.router.navigate(['/home']);
      },(e)=>{
        this.submitLoading = false;
        this.toaster.error(e?.error.message);
      })
    }
  }
}
