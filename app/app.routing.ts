import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { DriverHomeComponent } from './driver-home/index';
import { CreateJourneyComponent } from './create-journey/index';
//import { JourneysComponent } from './journeys/index';


 
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'driver-home', component: DriverHomeComponent },
    { path: 'create-journey', component: CreateJourneyComponent },
    //{ path: 'journeys', component: JourneysComponent },

 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);