import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any = {};
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("user") !== null){
      const userdata:any = localStorage.getItem("user");
      this.user = JSON.parse(userdata);
    }
  }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
