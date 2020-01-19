import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public selectType:string = "patient";
  constructor() { }

  ngOnInit() {
  }
  registerPatient(form)
  {
    var patientName=form.name.value;
    var patientCno=form.contactNo.value;
    var dob = form.DOB.value;
    var bloodType = form.bloodType.value;
    var address = form.address.value;
    console.log(patientName , patientCno,bloodType,dob,"\n",address);
  }
}
