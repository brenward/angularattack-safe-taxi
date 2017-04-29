import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Journey } from '../_models/index';
 
@Injectable()
export class JourneyService {
    constructor(private http: Http) { }
 
    createJourney(journey: Journey) {
        return this.http.post('/api/create-journey', JSON.stringify({ journey: journey }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
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

    getAllJourneys(journey: Journey) {
        return this.http.get('/api/journeys/getAll').map((response: Response) => response.json());
    }
}