import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private serverURL = "http://localhost:8000"

  constructor(private http:HttpClient) { }

  getPrescriptionList(userId):Observable<any>
  {
    return this.http.get(this.serverURL+"/getPrescriptionList/"+userId)
  }
}
