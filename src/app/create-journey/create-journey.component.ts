import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/index';
import { Journey }    from '../_models/journey';
import { Address }    from '../_models/address';
import { Passenger }  from '../_models/passenger';
import { Driver }     from '../_models/driver';

import { JourneyService } from '../_services/index';
import { AlertService } from '../_services/index';



@Component({
  selector: 'create-journey',
  templateUrl: './create-journey.component.html',
  styleUrls: [ './create-journey.css' ]
})

export class CreateJourneyComponent {

    currentUser: User;
    currentJourney: Journey;
    loading = false;


    constructor(private router: Router,private journeyService: JourneyService,
    private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentJourney = JSON.parse(localStorage.getItem('currentJourney'));
    }

  submitted = false;
  onSubmit(journey) { 
  this.submitted = true; 
  console.log("submitted");
  console.log(this.submitted);
}

    submitJourney() {
        this.loading = true;
        this.journeyService.createJourney(this.currentJourney)
            .subscribe(
                data => {
                          this.alertService.success('Journey successfully logged. ', true);
                            console.log("Journey submitted");
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
