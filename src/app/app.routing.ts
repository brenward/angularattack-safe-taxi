import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { DriverHomeComponent } from './driver-home/index';
import { JourneysComponent } from './journeys/index';
import { EditComponent } from './edit/index';
import { CreateJourneyComponent } from './create-journey/index';
import { RegulatorHomeComponent } from './regulator-home/regulator-home.component';
//import { JourneysComponent } from './journeys/index';
import { PassengerComponent } from './passenger/passenger.component';
 
const appRoutes: Routes = [
    { path: '', redirectTo: 'login',pathMatch:'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'driver-home', component: DriverHomeComponent },
    { path: 'journeys', component: JourneysComponent },
    { path: 'edit', component: EditComponent },
    { path: 'create-journey', component: CreateJourneyComponent },
    { path: 'passengers', component: PassengerComponent },
    { path: 'regulator-home', component: RegulatorHomeComponent },
    //{ path: 'journeys', component: JourneysComponent },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);