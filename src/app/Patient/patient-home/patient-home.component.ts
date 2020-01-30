import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {


  public userData
  constructor(private registerService:RegisterService) {
    this.registerService.userData.asObservable().subscribe(data=> this.userData=data)  
  }

  ngOnInit() {
  }

}
