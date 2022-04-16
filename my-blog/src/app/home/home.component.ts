import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public submitLoading: boolean = false;
  public showForm: boolean = false;
  public form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    status: new FormControl('', [Validators.required]),
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
      this.submitLoading = false;
      this.showForm = true;
      this.form.reset();
    }
  }

}
