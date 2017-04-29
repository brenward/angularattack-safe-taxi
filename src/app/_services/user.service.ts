import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get('/passenger/all', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: User) {
        console.log(JSON.stringify(user));
        return this.http.post('/user/register', user, this.jwt()).map((response: Response) => response.json());
    }
 
    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }
 
    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
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