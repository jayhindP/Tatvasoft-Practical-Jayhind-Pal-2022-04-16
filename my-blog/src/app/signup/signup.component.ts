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
      let jsonValues = this.form.value;
      let formData = new FormData();
      for(let key in jsonValues){
        formData.append(key, jsonValues[key]);
      }
      
      this.blog.signup(formData).subscribe((res: any)=> {
        if(res.status===1)
        {
          this.submitLoading = false;
          this.toaster.success("You have Registered Successfully.");
          localStorage.setItem("user", JSON.stringify(res.data));
          this.router.navigate(['/home']);
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
