import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claims } from '../models/claims.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private baseUrl='http://localhost:8080/api/v1/claims/'; 

  constructor(private http: HttpClient) { }

  getAllClaims(): Observable<Claims[]> {
    let tokenString = "Bearer "+localStorage.getItem("token");
    const headers =  new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    }).set("Authorization",tokenString);
    return this.http.get<Claims[]>(this.baseUrl + 'get-all',{headers,responseType:'json'});
  }

  updateClaim(claim: Claims): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any[]>(this.baseUrl + 'update', claim, { headers });
  }
}