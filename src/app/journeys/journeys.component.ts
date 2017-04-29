import { Component, OnInit } from '@angular/core';
 
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { JourneyService } from "app/_services/journey.service";
import { AlertService } from "app/_services/alert.service";
 
@Component({
    moduleId: module.id,
    templateUrl: 'journeys.component.html'
})
 
export class JourneysComponent implements OnInit {
  journeys = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private journeyService:JourneyService, private alertService:AlertService) { }

  ngOnInit() {
    this.journeyService.getAllJourneys()
      .subscribe(
          data => {
            this.journeys = data;
          },
          error => {
            this.alertService.error(error);
          });
  }
}