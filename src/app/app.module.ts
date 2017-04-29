import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
 
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
 
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, JourneyService,PassengerService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { DriverHomeComponent } from './driver-home/driver-home.component';
import { CreateJourneyComponent } from './create-journey/create-journey.component';
import { JourneysComponent } from './journeys/index';
import { EditComponent } from './edit/edit.component';
import { PassengerComponent } from './passenger/passenger.component';
import { RegulatorHomeComponent } from './regulator-home/regulator-home.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Angular2FontAwesomeModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
         DriverHomeComponent,
        CreateJourneyComponent,
        JourneysComponent,
        EditComponent,
        DriverHomeComponent,
        CreateJourneyComponent,
        PassengerComponent,
        RegulatorHomeComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        JourneyService,
        PassengerService,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})
 
export class AppModule { }