import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertService, PassengerService } from '../_services/index';
import { Passenger } from '../_models/index';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
 model: any = {};
 passengers: Passenger[] = [];
 loading = false;
  returnUrl: string;

  constructor( 
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private passService: PassengerService,) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/driver-home';
    this.loadAllPassengers();
  }
 
    deleteUser(id: number) {
        this.passService.delete(id).subscribe(() => { this.loadAllPassengers() });
    }
 
    private loadAllPassengers() {
        this.passService.getAll().subscribe(passengers => { this.passengers = passengers; });
    }

    create() {
        this.passService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Passenger Created successful', true);
                    this.loadAllPassengers();
                     this.router.navigateByUrl('/login', true);
                  this.router.navigate(["/passengers"]);
                  
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
