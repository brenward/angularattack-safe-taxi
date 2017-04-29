import { Component, OnInit } from '@angular/core';
import { Journey } from "app/_models";
import { JourneyService } from "app/_services/journey.service";
import { AlertService } from "app/_services";

@Component({
  selector: 'app-regulator-home',
  templateUrl: './regulator-home.component.html',
  styleUrls: ['./regulator-home.component.css'],
  providers:[JourneyService]
})
export class RegulatorHomeComponent implements OnInit {
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
