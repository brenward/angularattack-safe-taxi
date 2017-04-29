import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Passenger } from '../_models/index';

@Injectable()
export class PassengerService {
constructor(private http: Http) { }
 
    getAll() {
        return this.http.get('/passenger/all', this.jwt()).map((response: Response) => response.json());
    }
 
    create(passenger: Passenger) {
        return this.http.post('/passenger/new', passenger, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/passenger/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    // private helper methods
 
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
