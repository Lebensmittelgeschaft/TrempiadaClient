import { Component, OnInit } from '@angular/core';
import { UserService } from './user-service/user.service';

@Component({
  selector: 'app-user-rides-page',
  templateUrl: './user-rides-page.component.html',
  styleUrls: ['./user-rides-page.component.scss']
})
export class UserRidesPageComponent implements OnInit {
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserRides();
  }

}
