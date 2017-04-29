import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/index';
import { Journey }    from '../_models/journey';
import { Address }    from '../_models/address';
import { Passenger }  from '../_models/passenger';
import { Driver }     from '../_models/driver';

//import { JourneyService } from '../_services/index';
import { AlertService } from '../_services/index';


@Component({
  selector: 'create-journey',
  templateUrl: './create-journey.component.html'
})
export class CreateJourneyComponent {

    currentUser: User;
    currentJourney: Journey;
    loading = false;


    // constructor(private router: Router,private journeyService: JourneyService,
    // private alertService: AlertService) {

      
        
    //     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     this.currentJourney = JSON.parse(localStorage.getItem('currentJourney'));
    // }


    //demo data
address = new Address (18, 'a', 'b','c');
passenger = new Passenger('Daniel', 'Phelan', '0876543212', this.address );
driver = new Driver('dave@davecabs', 'sasjkjak', false);
journey = new Journey(1,'2017-04-22', 'Ranelagh', 'Grand Canal Plaza', 18,
  this.passenger, this.driver);
//   //end demo data

  submitted = false;
  onSubmit(journey) { 
  this.submitted = true; 
  console.log("submitted");
  console.log(this.submitted);
  console.log(this.journey);
}

    // submitJourney() {
    //     this.loading = true;
    //     this.journeyService.createJourney(this.journey)
    //         .subscribe(
    //             data => {
    //                 this.router.navigate(['/journey-created']);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }
}
