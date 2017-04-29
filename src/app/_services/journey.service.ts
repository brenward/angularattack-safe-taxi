import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Journey, Driver } from '../_models/index';
 
@Injectable()
export class JourneyService {
    constructor(private http: Http) { }
 
    createJourney(journey: Journey) {
        return this.http.post('/journey/new', JSON.stringify({ journey: journey }))
            .map((response: Response) => {
                let journey = response.json();
                if (journey) {
                    // store journey details
                    localStorage.setItem('currentJourney', JSON.stringify(journey));
                }
            });
    }
        updateJourney(journeyId: number, journey:Journey) {
        return this.http.put('/api/journeys/updateJourney' + journeyId, journey).map((response: Response) => response.json());
    }

    getJourneyById(journeyId: number) {
        return this.http.get('/api/journeys/' + journeyId).map((response: Response) => response.json());
    }

    getAllJourneys() {
        return this.http.get('/journey/',this.jwt())
            .map(
                (response: Response) => {
                    const data = response.json();
                    for(let dataItem of data){
                        dataItem['journeyId'] = dataItem._id;
                        dataItem['driver'] = dataItem.driver.username;
                        dataItem['dateOfJourney'] = dataItem.date;
                    }
                    return data;
                });
    }

    private jwt() {
        let headers = new Headers();
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
         headers.append('Content-Type', 'application/json');
        if (currentUser && currentUser.token) {
            headers.append('Authorization', 'JWT ' + currentUser.token);
            
        }
        return new RequestOptions({ headers: headers });
    }
}

// @Injectable()
// export class AuthenticationService {
//     constructor(private http: Http) { }
 
//     login(username: string, password: string) {
//     var data = JSON.stringify({  username: username, password: password});

//     var headers = new Headers();
//     headers.append('Content-Type', 'application/json');

//         console.log(JSON.stringify({ username: username, password: password }));
//         return this.http.post('/user/login',data,{headers}).map((response: Response) => {
//                 // login successful if there's a jwt token in the response
//                 let user = response.json();
//                 if (user && user.token) {
//                     // store user details and jwt token in local storage to keep user logged in between page refreshes
//                     localStorage.setItem('currentUser', JSON.stringify(user));
//                 }
//             });
//     }
 
//     logout() {
//         // remove user from local storage to log user out
//         localStorage.removeItem('currentUser');
//     }
// }