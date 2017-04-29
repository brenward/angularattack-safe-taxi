import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/index';
import { UserService } from '../_services/index';


@Component({
  selector: 'driver-home',
  moduleId: module.id,
  templateUrl: './driver-home.component.html',
  styleUrls: [ './driver-home.component.css' ]

})
//Always export the component class because you'll always import it elsewhere.
export class DriverHomeComponent{

    returnUrl: string;
    currentUser: User;

    constructor(private userService: UserService, private route: ActivatedRoute,
        private router: Router) {
        
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    createJourney(){
      console.log("create journey triggered");
      this.router.navigate(['/create-journey']);
    }

    editJourneys(){
      console.log("edit journey triggered");
      this.router.navigate(['/edit-journeys']);

    }
}