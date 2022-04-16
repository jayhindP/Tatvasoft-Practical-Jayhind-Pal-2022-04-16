import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private toaster: ToastrService
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
      this.toaster.success("asfasfd");
    }
  }
}
