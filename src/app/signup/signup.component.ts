import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../sign-up.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public selectType:string = "patient";
  constructor(private signUpService:SignUpService) { }

  ngOnInit() {
  }
  registerPatient(form)
  {
    var uid = form.patientUid.value;
    var psw = form.patientPsw.value;
    var patientName = form.name.value;
    var patientCno = form.contactNo.value;
    var dob = form.DOB.value;
    var bloodType = form.bloodType.value;
    var address = form.address.value;
    console.log("compoenent ts", uid, psw, patientName , patientCno, bloodType, dob,"\n",address);
    this.signUpService.registerPatient(form)
  }
}
