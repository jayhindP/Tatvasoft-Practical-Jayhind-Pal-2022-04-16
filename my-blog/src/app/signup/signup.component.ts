import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public submitLoading: boolean = false;
  public form = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    dob: new FormControl(null, [Validators.required]),
    role: new FormControl('', [Validators.required]),
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
      this.blog.signup(this.form.value).subscribe((res: any)=> {
        this.toaster.success("You have Registered Successfully.");
        localStorage.setItem("user", JSON.stringify(res));
        this.router.navigate(['/home']);
      },(e)=>{
        this.toaster.error(e?.error.message);
      })
    }
  }

}
